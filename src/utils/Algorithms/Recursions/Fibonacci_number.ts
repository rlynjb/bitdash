/**
 * A general additive sequence
 */

/**
 * Uses bottom-up approach where we start and add b1 and b2 values
 * until we reach its nth value.
 * it also chips away its nth value by 1 problem at a time every recursion run.
 * 
 * Uses decrease and conquer and no cache.
 * runs in Linear time complexity and operation is constant.
 * 
 * @param {int32} n
 * @return {int32}
 */
export function bottom_up_decrease_and_conquer_find_fibonacci(n:number, b1:number = 0, b2:number = 1) {
  // Write your code here.
  if (n == 0) {
      return b1;
  } else {
      return bottom_up_decrease_and_conquer_find_fibonacci(n-1, b2, b1+b2);
  }
}


/**
 * Uses bottom-up approach where we start and add b1 and b2 values
 * until we reach its nth value.
 * it also chips away its nth value by 1 problem at a time every recursion run.
 * 
 * Uses a iterative approach and no cache.
 * runs in linear time, but there are about
 * 3 operations since we use swap.
 * 
 * @param {int32} n
 * @return {int32}
 */
export function bottom_up_iterative_approach_find_fibonacci(n:number) {
  // Write your code here.
  let prev1 = 0, prev2=1;
  
  for(let i=2; i<=n; i++){
      const fib = prev1+prev2;
      prev1 = prev2;
      prev2 = fib
  }
  
  return n>=1 ? prev2 : prev1
}


/**
 * Uses top-down approach where solve problem in recursive way.
 * - we decrease nth value by 1 on the left
 * - and decrease nth value by 2 on the right
 * - until both hits its node leaf in tree callstack (means, nth value has been chipped to 0 or 1)
 * - and each node backtracks (pops off from tree callstack queue)
 * - returns both left node and right node totaled values
 * 
 * Uses Divide and Conquer, but leads to poor performance due to
 * exponential number of nodes.
 * 
 * to avoid time exceed, use cache to store values
 * and re-use values instead of calling another recursive call to generate node value.
 * 
 * @param {int32} n
 * @return {int32}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: any = {};

export function top_down_divide_and_conquer_cache_find_fibonacci(n:number): number {
    // Write your code here.
    if (n <= 1) return n;
    if (cache[n]) {
        return cache[n]
    }
    const val = top_down_divide_and_conquer_cache_find_fibonacci(n-1) + top_down_divide_and_conquer_cache_find_fibonacci(n-2);
    cache[n] = val;
    return val;
}

