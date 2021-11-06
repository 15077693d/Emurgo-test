import { getArrayMutations, substractStar } from "../index";
describe("getArrayMutations", () => {
  test("[] -> []", () => {
    expect(getArrayMutations([])).toStrictEqual([]);
  });
  test("['1','2']] -> []", () => {
    expect(getArrayMutations(["1", "2"])).toStrictEqual([
      ["1", "2"],
      ["2", "1"],
    ]);
  });
});

describe("substractStar", () => {
  test("mutation [1,0,1],target 10*1*1* => 1011011", () => {
    expect(substractStar(["1", "0", "1"], "10*1*1*")).toStrictEqual("1011011");
  });
  test("mutation [1],target 10*1 => 1011", () => {
    expect(substractStar(["1"], "10*1")).toStrictEqual("1011");
  });
  test("mutation [],target 101 => 101", () => {
    expect(substractStar([], "101")).toStrictEqual("101");
  });
});
