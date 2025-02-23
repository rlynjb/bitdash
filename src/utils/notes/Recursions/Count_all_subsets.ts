/**
 * Problem: Count All Subsets Of A Set Of Size N
 * Topic: Number of Subsets of a Set
 * 
 * Pattern: as value of n increase by 1. Number of subsets double.
 */

/*
 * Uses decrease and conquer, chips away nth problem size by 1
 * and runs in linear time complexity.
 * 
 * @param {int32} n
 * @return {int32}
 */
export function decrease_and_conquer_count_all_subsets(n: number): number {
  // Write your code here.
  if (n === 0) {
      return 1;
  } else {
      return 2 * decrease_and_conquer_count_all_subsets(n-1)
  }
}

/**
 * Uses divide and conquer. Since the number ofsubsets doubles.
 * We can divide the problem into 2 subproblems.
 * but it run in Exponential time.
 * 
 * @param {int32} n
 * @return {int32}
 */
export function divide_and_conquer_count_all_subsets(n:number): number {
  // Write your code here.
  if (n == 0) {
      return 1;
  } else {
      return divide_and_conquer_count_all_subsets(n-1) + divide_and_conquer_count_all_subsets(n-1);
  }
}
