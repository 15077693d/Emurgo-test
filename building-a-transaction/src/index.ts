interface ClosingAccount {
  accountId: string;
  amount: number;
}
interface RecipientAccount {
  accountId: string;
  credit: number;
}

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

export const newRebalancingTx = (
  closingAccounts: ClosingAccount[],
  recipientAccounts: RecipientAccount[]
) => {};
