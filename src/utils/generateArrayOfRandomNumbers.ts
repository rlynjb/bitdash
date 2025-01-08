/**
 * @param length 
 * @returns {Int32Array}
 */
export const generateArrayOfRandomNumbers = (length: number) => {
  const arr = [];
  const min = 1;
  const max = 60;

  while (arr.length < length) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (num !== 0) {
      arr.push(num);
    }
  }

  return arr;
}

export default generateArrayOfRandomNumbers;