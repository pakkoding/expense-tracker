export const _translator = (word = null) => {
  const dataDict = {
    date: 'วันที่',
    time: 'เวลา',
    datetime: 'วันที่ และ เวลา',
    group: 'หมวดหมู่',
    name: 'ชื่อ',
    type: 'ประเภทรายการ',
    amount: 'จำนวนเงิน'
  }
  return dataDict[word] || word
}
