import { getArrayMutations } from "../index";
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
