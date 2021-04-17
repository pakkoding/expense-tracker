import moment from 'moment'
export const _formatDatetime = (date = null, format = 'YYYY-MM-DD hh:mm:ss') => {
  if (date) {
    return moment(date).format(format)
  }
  return date
}
