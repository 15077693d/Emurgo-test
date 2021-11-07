import {
  getArrayMutations,
  substractStar,
  getUniqueMutations,
  getZeroOneMutations,
} from "../index";
describe("getArrayMutations", () => {
  test("[] -> []", () => {
    expect(getArrayMutations([])).toStrictEqual([]);
  });
  test("['0','1']] -> [['0', '1'],['1', '0']]", () => {
    expect(getArrayMutations(["0", "1"])).toStrictEqual([
      ["0", "1"],
      ["1", "0"],
    ]);
  });
  test("['1','0','1']] -> [...]", () => {
    expect(getArrayMutations(["1", "0", "1"])).toStrictEqual([
      ["1", "0", "1"],
      ["0", "1", "1"],
      ["1", "1", "0"],
      ["1", "1", "0"],
      ["0", "1", "1"],
      ["1", "0", "1"],
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

describe("getUniqueMutations", () => {
  test("mutation [],target 101 => 101", () => {
    expect(
      getUniqueMutations([
        ["1", "0", "1"],
        ["0", "1", "1"],
        ["1", "1", "0"],
        ["1", "1", "0"],
        ["0", "1", "1"],
        ["1", "0", "1"],
      ])
    ).toStrictEqual([
      ["1", "0", "1"],
      ["0", "1", "1"],
      ["1", "1", "0"],
    ]);
  });
});

describe("getZeroOneMutations", () => {
  test("3 -> [000,001,011,111]", () => {
    expect(getZeroOneMutations(3)).toStrictEqual([
      ["0", "0", "0"],
      ["0", "0", "1"],
      ["0", "1", "1"],
    ]);
  });
});
