/**
 * Use inside an async function > for loop
 * @returns Promise
 */
export const delayLoop = (delay: number = 1000) => new Promise((resolve) => setTimeout(resolve, delay));

export default delayLoop;