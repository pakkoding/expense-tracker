import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

const interceptError = function (middlewareAPI) {
  return function (next) {
    return function (action) {
      const { error } = action
      if (error) {
        if (_.isArray(error)) {
          toastr.error(error[0], error[1])
        } else {
          toastr.error(error)
        }
      }
      return next(action)
    }
  }
}

export default interceptError
