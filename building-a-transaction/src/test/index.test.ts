import {
  calculateTotalCredit,
  calculateTotalAmount,
  createTransfers,
  newRebalancingTx,
  minorFee,
} from "../index";

describe("minorFee", () => {
  test('{operationalFee: 30,transfers: [  ["1", "2", 100],  ["1", "3", 40],  ["1", null, 60] ]} => [  ["1", "2", 100],  ["1", "3", 40],  ["1", null, 30] ]', () => {
    expect(
      minorFee(30, [
        ["1", "2", 100],
        ["1", "3", 40],
        ["1", null, 60],
      ])
    ).toStrictEqual([
      ["1", "2", 100],
      ["1", "3", 40],
      ["1", null, 30],
    ]);
  });
  test('{operationalFee: 30,transfers: [  ["1", "2", 100],  ["1", "3", 40],  ["1", null, 60] ]} => [  ["1", "2", 100],  ["1", "3", 40],  ["1", null, 30] ]', () => {
    expect(
      minorFee(30, [
        ["1", "2", 100],
        ["1", "3", 40],
        ["1", null, 10],
        ["1", null, 20],
      ])
    ).toStrictEqual([
      ["1", "2", 100],
      ["1", "3", 40],
    ]);
  });
});
describe("calculateTotalCredit", () => {
  test('[{ accountId: "1", credit: 100 },{ accountId: "2", credit: 200 }]', () => {
    expect(
      calculateTotalCredit([
        { accountId: "1", credit: 100 },
        { accountId: "2", credit: 200 },
      ])
    ).toBe(300);
  });
});

describe("calculateTotalAmount", () => {
  test('[{ accountId: "1", amount: 100 },{ accountId: "2", amount: 200 }]', () => {
    expect(
      calculateTotalAmount([
        { accountId: "1", amount: 100 },
        { accountId: "2", amount: 200 },
      ])
    ).toBe(300);
  });
});

describe("createTransfers", () => {
  test('closingAccount:{ accountId: "1", amount: 200;} remainingRecipientAccounts:[{ accountId: "2", credit: 100},{ accountId: "2", credit: 40},{ accountId: "2", credit: 400}];', () => {
    expect(
      createTransfers({ accountId: "1", amount: 200 }, [
        { accountId: "2", credit: 100 },
        { accountId: "3", credit: 40 },
        { accountId: "4", credit: 400 },
      ])
    ).toStrictEqual({
      closingAccount: { accountId: "1", amount: 0 },
      remainingRecipientAccounts: [{ accountId: "4", credit: 340 }],
      transfers: [
        ["1", "2", 100],
        ["1", "3", 40],
        ["1", "4", 60],
      ],
    });
  });
  test('closingAccount:{ accountId: "1", amount: 200;} remainingRecipientAccounts:[{ accountId: "2", credit: 100},{ accountId: "2", credit: 40}];', () => {
    expect(
      createTransfers({ accountId: "1", amount: 200 }, [
        { accountId: "2", credit: 100 },
        { accountId: "3", credit: 40 },
      ])
    ).toStrictEqual({
      closingAccount: { accountId: "1", amount: 60 },
      remainingRecipientAccounts: [],
      transfers: [
        ["1", "2", 100],
        ["1", "3", 40],
      ],
    });
  });
});

describe("newRebalancingTx", () => {
  test("For example, if closed acc1 and acc2 with amounts 500 and 500 and one recipient rec1 with credit 400", () => {
    expect(
      newRebalancingTx(
        [
          { accountId: "1", amount: 500 },
          { accountId: "2", amount: 500 },
        ],
        [{ accountId: "1", credit: 400 }]
      )
    ).toStrictEqual({
      operationalFee: 30,
      transfers: [
        ["1", "1", 400],
        ["1", null, 100],
        ["2", null, 470],
      ],
    });
  });
  test('closingAccount:{ accountId: "1", amount: 200;} remainingRecipientAccounts:[{ accountId: "2", credit: 100},{ accountId: "2", credit: 40},{ accountId: "2", credit: 400}];', () => {
    expect(
      newRebalancingTx(
        [{ accountId: "1", amount: 200 }],
        [
          { accountId: "2", credit: 100 },
          { accountId: "3", credit: 40 },
        ]
      )
    ).toStrictEqual({
      operationalFee: 30,
      transfers: [
        ["1", "2", 100],
        ["1", "3", 40],
        ["1", null, 30],
      ],
    });
  });
  test("totalCredit>totalAmount -> error", () => {
    expect(() => {
      newRebalancingTx(
        [{ accountId: "1", amount: 100 }],
        [
          { accountId: "2", credit: 100 },
          { accountId: "3", credit: 40 },
        ]
      );
    }).toThrow("not enough funds for rebalance");
  });
  test("fee>fee quote -> error", () => {
    expect(() => {
      newRebalancingTx(
        [{ accountId: "1", amount: 140 }],
        [
          { accountId: "2", credit: 100 },
          { accountId: "3", credit: 40 },
        ]
      );
    }).toThrow("not enough funds for rebalance");
  });
});
