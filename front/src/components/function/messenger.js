import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

export function _alertMessage (mode, title, resp) {
  let msg = ''
  if (!resp || !resp.response) {
    toastr[mode](title, resp)
    return
  }
  if (_.isArray(resp.response.data)) {
    title = title || `${resp.response.status} ${resp.response.statusText}`
    toastr[mode](title, _.join(resp.response.data, '\n'))
  } else if (_.isObject(resp.response.data)) {
    // {amount: ["Ensure that there are no more than 2 decimal places."]}
    title = title || `เกิดข้อผิดพลาดในการส่งข้อมูล`
    Object.keys(resp.response.data).forEach((key) => {
      resp.response.data[key].forEach((detail) => {
        msg += key + ': ' + detail + '\n'
      })
    })
    toastr[mode](title, msg)
  } else {
    msg = `${resp.response.status} ${resp.response.statusText}`
    if (resp.response.data.detail) {
      msg += '\n' + resp.response.data.detail
    }
    if (resp.response.data.error) {
      msg += '\n' + resp.response.data.error
    }
    toastr[mode](title, msg)
  }
}
