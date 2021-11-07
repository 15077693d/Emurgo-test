import { calculateTotalCredit, calculateTotalAmount } from "../index";

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
