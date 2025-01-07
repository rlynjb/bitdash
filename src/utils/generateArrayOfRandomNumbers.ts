/**
 * @param length 
 * @returns {Int32Array}
 */
export const generateArrayOfRandomNumbers = (length: number) => {
  const list = [];

  for (let i = 0; i < length; i++) {
    list.push(Math.floor(Math.random() * 60));
  }
  return list;
}

export default generateArrayOfRandomNumbers;