
/**
 * @param {int32} n
 * @param {int32} k
 * @return {list_list_int32}
 */
function combinationsRecursive(
  currentNumber: number,
  n: number,
  k: number,
  current: number[],
  result: number[][]
) {
  if (k === current.length) {
      result.push([...current]);
      return;
  }
  if (currentNumber === n + 1) {
      return;
  }
  current.push(currentNumber);
  combinationsRecursive(currentNumber + 1, n, k, current, result);
  current.pop();
  combinationsRecursive(currentNumber + 1, n, k, current, result);
}

function find_combinations(n: number, k: number) {
  const result: number[][] = [];
  const current: number[] = [];

  combinationsRecursive(1, n, k, current, result);
  return result;
}
