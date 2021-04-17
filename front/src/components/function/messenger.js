import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

export function _alertMessage (mode, title, resp) {
  if (!resp || !resp.response) {
    toastr[mode](title, resp)
    return
  }
  if (_.isArray(resp.response.data)) {
    title = title || `${resp.response.status} ${resp.response.statusText}`
    toastr[mode](title, _.join(resp.response.data, '\n'))
  } else {
    let msg = `${resp.response.status} ${resp.response.statusText}`
    if (resp.response.data.detail) {
      msg += '\n' + resp.response.data.detail
    }
    if (resp.response.data.error) {
      msg += '\n' + resp.response.data.error
    }
    toastr[mode](title, msg)
  }
}
