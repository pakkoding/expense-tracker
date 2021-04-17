import axios from 'axios'
import { _alertMessage } from '../mixins/messenger'

const API_URL = process.env.NEXT_PUBLIC_APP_API_ADDRESS

export const _getGroupStatement = () => {
  axios.get(`${API_URL}/group-statement/`).then(resp => {
    console.log(resp)
  }).catch(error => {
    _alertMessage('error', 'เกิดข้อผิดพลาด', error)
  })
}
