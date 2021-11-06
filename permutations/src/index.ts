export const getArrayMutations = (
  arr: string[],
  perms: string[][] = [],
  len = arr.length
) => {
  if (len === 1) perms.push(arr.slice(0));

  for (let i = 0; i < len; i++) {
    getArrayMutations(arr, perms, len - 1);

    len % 2 // parity dependent adjacent elements swap
      ? ([arr[0], arr[len - 1]] = [arr[len - 1], arr[0]])
      : ([arr[i], arr[len - 1]] = [arr[len - 1], arr[i]]);
  }
  return perms;
};

export const substractStar = (mutation: string[], target: string) => {
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
