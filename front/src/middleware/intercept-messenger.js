import { toastr } from 'react-redux-toastr'
import _ from 'lodash'

const interceptMessenger = function (middlewareAPI) {
  return function (next) {
    return function (action) {
      const { messenger } = action
      if (messenger) {
        if (_.isArray(messenger)) {
          if (messenger.length === 3) {
            toastr[messenger[0]](messenger[1], messenger[2])
          } else if (messenger.length === 2) {
            toastr[messenger[0]](messenger[1])
          } else {
            toastr.info(messenger[0])
          }
        } else if (_.isObject(messenger)) {
          if (messenger.title) {
            toastr[messenger.type](messenger.title, messenger.text)
          } else {
            toastr[messenger.type](messenger.text)
          }
        } else {
          toastr.info(messenger)
        }
      }
      return next(action)
    }
  }
}

export default interceptMessenger
