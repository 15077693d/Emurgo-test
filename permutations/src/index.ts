/**
 * 2
 * 11 2 -> 1
 * 01 1 -> 1
 * 00 0 -> 1
 * @param numberOfStar
 */
export const getZeroOneMutations = (numberOfStar: number) => {
  const perms: string[][] = [];
  for (let i = 0; i <= numberOfStar; i++) {
    const numberOfZero = numberOfStar - i;
    const numberOfOne = i;
    const subPerm: string[] = [];
    for (let j = 0; j < numberOfZero; j++) {
      subPerm.push("0");
    }
    for (let k = 0; k < numberOfOne; k++) {
      subPerm.push("1");
    }
    perms.push(subPerm);
  }
  return perms;
};
export const getUniqueMutations = (perms: string[][]): string[][] => {
  // set perms string
  return Array.from(new Set(perms.map((array) => array.join("")))).map(
    (permString) => permString.split("")
  );
};
export const getArrayMutations = (
  arr: string[],
  perms: string[][] = [],
  len = arr.length
): string[][] => {
  if (len === 1) perms.push(arr.slice(0));

  for (let i = 0; i < len; i++) {
    getArrayMutations(arr, perms, len - 1);

    len % 2 // parity dependent adjacent elements swap
      ? ([arr[0], arr[len - 1]] = [arr[len - 1], arr[0]])
      : ([arr[i], arr[len - 1]] = [arr[len - 1], arr[i]]);
  }
  return perms;
};

export const substractStar = (mutation: string[], target: string): string => {
  if (mutation.length === 1) {
    return target.replace("*", mutation[0]);
  } else if (mutation.length === 0) {
    return target;
  }
  // split target by *
  const targetPhase = target.split("*");
  let result: string[] = [];
  // loop targetPhase and add mutation
  for (let i = 0; i < targetPhase.length; i++) {
    if (i === targetPhase.length - 1) {
      result.push(mutation[i]);
    } else {
      result.push(targetPhase[i]);
      result.push(mutation[i]);
    }
  }
  return result.join("");
};
/**
 *
 * @param {string} input
 * @returns {string[]} output
 */
export const main = (input: string): string[] => {
  const output: string[] = [];
  // getZeroOneMutations
  const numberOfStar = input.split("*").length - 1;
  if (numberOfStar == 0) {
    output.push(input);
  } else {
    const zeroOneMutations = getZeroOneMutations(numberOfStar);
    // getArrayMutations, substractStar
    zeroOneMutations.forEach((zeroOneMutation) => {
      const arrayMutations = getArrayMutations(zeroOneMutation);
      const uniqueMutations = getUniqueMutations(arrayMutations);
      uniqueMutations.forEach((uniqueMutation) => {
        output.push(substractStar(uniqueMutation, input));
      });
    });
  }
  return output;
};
