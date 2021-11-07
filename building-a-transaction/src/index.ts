interface ClosingAccount {
  accountId: string;
  amount: number;
}
interface RecipientAccount {
  accountId: string;
  credit: number;
}
/**
 * Refactor transfers which reduce null tx amount for handle operationalFee
 * @param {number}operationalFee
 * @param {Array<[string, null | string, number]>}transfers
 * @returns {Array<[string, null | string, number]>} transfers after fee
 */
export const minorFee = (
  operationalFee: number,
  transfers: Array<[string, null | string, number]>
) => {
  let currentOperationalFee = operationalFee;
  for (let i = 0; i < transfers.length; i++) {
    let index = transfers.length - 1 - i;
    const difference = currentOperationalFee - transfers[index][2];
    if (difference > 0) {
      // this tx cannot handle all fee
      currentOperationalFee = currentOperationalFee - transfers[index][2];
      transfers[index][2] = 0;
    } else {
      // this tx can handle all fee
      transfers[index][2] = transfers[index][2] - currentOperationalFee;
      currentOperationalFee = 0;
    }
    if (currentOperationalFee == 0) {
      break;
    }
  }
  // filter amount = 0 tx
  return transfers.filter((tx) => tx[2] !== 0);
};
/**
 * Create tx which match amount and credit distribution
 * @param {ClosingAccount}closingAccount
 * @param {RecipientAccount[]}remainingRecipientAccounts
 * @returns
 */
export const createTransfers = (
  closingAccount: ClosingAccount,
  remainingRecipientAccounts: RecipientAccount[]
) => {
  let recentAmount = closingAccount.amount;
  const transfers: Array<[string, null | string, number]> = [];
  const fromAccountId = closingAccount.accountId;
  for (let i = 0; i < remainingRecipientAccounts.length; i++) {
    const recipientAccount = remainingRecipientAccounts[i];
    const difference = recentAmount - recipientAccount.credit;
    const toAccountId = recipientAccount.accountId;
    // record create
    if (difference > 0) {
      const value = recipientAccount.credit;
      transfers.push([fromAccountId, toAccountId, value]);
    } else {
      // return transfers and new remainingRecipientAccounts
      transfers.push([fromAccountId, toAccountId, recentAmount]);
      const newCredit = recipientAccount.credit - recentAmount;
      return {
        closingAccount: { accountId: fromAccountId, amount: 0 },
        transfers: transfers,
        remainingRecipientAccounts: [
          { accountId: recipientAccount.accountId, credit: newCredit },
        ].concat(remainingRecipientAccounts.slice(i + 1)),
      };
    }
    recentAmount -= recipientAccount.credit;
  }

  return {
    closingAccount: { accountId: fromAccountId, amount: recentAmount },
    transfers: transfers,
    remainingRecipientAccounts: [],
  };
};
/**
 * Calculate Total Credit from recipient accounts
 * @param {RecipientAccount[]} recipientAccounts
 * @returns {number} totalCredit
 */
export const calculateTotalCredit = (
  recipientAccounts: RecipientAccount[]
): number => {
  const totalCredit: number = recipientAccounts
    .map((account) => account.credit)
    .reduce(function (prev, current) {
      return prev + current;
    });
  return totalCredit;
};
/**
 * Calculate Total Amount from closing accounts
 * @param {ClosingAccount[]} closingAccounts
 * @returns {number} totalAmount
 */
export const calculateTotalAmount = (
  closingAccounts: ClosingAccount[]
): number => {
  const totalAmount: number = closingAccounts
    .map((account) => account.amount)
    .reduce(function (prev, current) {
      return prev + current;
    });
  return totalAmount;
};
/**
 * Rebalance ClosingAccount to RecipientAccount
 * 1. Compare credit and amount
 * 2. Loop each closing account amount to handle recipient account credit then create tx
 * 3. Calculate fee
 * @param {ClosingAccount[]} closingAccounts
 * @param {RecipientAccount[]} recipientAccounts
 * @returns
 */
export const newRebalancingTx = (
  closingAccounts: ClosingAccount[],
  recipientAccounts: RecipientAccount[]
) => {
  const totalCredit = calculateTotalCredit(recipientAccounts);
  const totalAmount = calculateTotalAmount(closingAccounts);
  const difference = totalAmount - totalCredit;
  let transfers: Array<[string, null | string, number]> = [];
  let remainingRecipientAccounts = recipientAccounts;
  let avaliableFeeQuote = 0;
  // totalCredit>totalAmount -> error
  if (difference < 0) {
    throw new Error("not enough funds for rebalance");
  } else {
    // totalCredit<totalAmount -> create transfers
    for (let i = 0; i < closingAccounts.length; i++) {
      // infinite loop to create tx break with closingAccounts amount == 0 or no remaining Recipient Accounts
      while (true) {
        const output = createTransfers(
          closingAccounts[i],
          remainingRecipientAccounts
        );
        closingAccounts[i] = output.closingAccount;
        remainingRecipientAccounts = output.remainingRecipientAccounts;
        transfers = transfers.concat(output.transfers);
        if (remainingRecipientAccounts.length === 0) {
          avaliableFeeQuote += closingAccounts[i].amount;
          transfers.push([
            closingAccounts[i].accountId,
            null,
            closingAccounts[i].amount,
          ]);
          break;
        }
        if (closingAccounts[i].amount === 0) {
          break;
        }
      }
    }
  }
  // calculate fee
  const operationalFee = transfers.length * 10;
  if (operationalFee > avaliableFeeQuote) {
    throw new Error("not enough funds for rebalance");
  }
  transfers = minorFee(operationalFee, transfers);
  return {
    transfers,
    operationalFee,
  };
};

console.log(
  newRebalancingTx(
    [
      { accountId: "acc1", amount: 500 },
      { accountId: "acc2", amount: 500 },
    ],
    [{ accountId: "rec1", credit: 400 }]
  )
);
