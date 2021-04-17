export const _translator = (word = null) => {
  const dataDict = {
    date: 'วันที่',
    time: 'เวลา',
    datetime: 'วันที่ และ เวลา',
    group: 'หมวดหมู่',
    name: 'ชื่อ',
    type: 'ประเภทรายการ',
    amount: 'จำนวนเงิน',
    start_date: 'วันที่เริ่มต้น',
    end_date: 'ถึงวันที่'
  }
  return dataDict[word] || word
}
