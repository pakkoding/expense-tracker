import axios from 'axios'
import _ from 'lodash'
import { _alertMessage } from './messenger'

const API_URL = process.env.NEXT_PUBLIC_APP_API_ADDRESS

export const _getGroupStatement = () => {
  return axios.get(`${API_URL}/app/statement-group/`).then(resp => {
    if (resp?.data) {
      return _.map(resp.data, item => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
    return null
  }).catch(error => {
    _alertMessage('error', 'เกิดข้อผิดพลาด', error)
  })
}

export const _findGroupStatementValue = (group, groupStatement) => {
  const result = _.filter(groupStatement, (item) => item.text === group)
  if (Array.isArray(result) && result.length > 0) {
    return result[0].value
  }
  return group
}

export const _findGroupStatementText = (group, groupStatement) => {
  const result = _.filter(groupStatement, (item) => item.value === group)
  if (Array.isArray(result) && result.length > 0) {
    return result[0].text
  }
  return group
}
