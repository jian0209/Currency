export const ToThousands = (num) => {
  let tempNum = num.toString().split('.');
  let afterDecimal = tempNum[1] ? '.' + tempNum[1] : '';
  let result = '';
  for (let i = tempNum[0].length - 1; i >= 0; i--) {
    result = tempNum[0][i] + result;
    if ((tempNum[0].length - i) % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }
  return result + afterDecimal;
};
