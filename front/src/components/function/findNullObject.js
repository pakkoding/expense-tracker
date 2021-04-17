import _ from 'lodash'

export const _findNullObject = (obj = {}) => {
  return _.filter(obj, item => item === null || item === '').length
}
