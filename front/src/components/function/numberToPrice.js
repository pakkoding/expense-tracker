export const _numberToPrice = (num = 0) => {
  return num ? num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] : 0
}
