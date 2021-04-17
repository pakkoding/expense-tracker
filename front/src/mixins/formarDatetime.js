import moment from 'moment'
export const _formatDatetime = (date = null) => {
  if (date) {
    return moment(date).format('YYYY-MM-DD hh:mm:ss')
  }
  return date
}
