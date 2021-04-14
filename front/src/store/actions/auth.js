import { SIGNED_IN, SIGN_IN_ERROR, SIGNED_OUT } from '../constants'
import axios from 'axios'

const ISSERVER = typeof window === 'undefined'
const initialState = { loggedIn: false }
if (!ISSERVER) {
  const sessionUser = sessionStorage.getItem('user')
  const sessionRefreshToken = sessionStorage.getItem('refresh_token')
  if (sessionUser && sessionRefreshToken) {
    try {
      const user = JSON.parse(sessionUser)
      if (user.id &&
      user.username &&
      user.first_name &&
      user.last_name
      ) {
        initialState.user = user
        initialState.loggedIn = true
        initialState.refresh = sessionRefreshToken
      }
    } catch (e) {
      console.error('cannot parse user session.')
      console.error(e)
      sessionStorage.clear()
    }
  }
}

export const signIn = (username, password) => async dispatch => {
  return axios.post(`${process.env.NEXT_PUBLIC_APP_API_ADDRESS}/token/`, {
    username: username,
    password: password
  }).then(response => {
    let config = {
      headers: {
        Authorization: 'Bearer ' + response.data.access
      }
    }
    return axios.get(`${process.env.NEXT_PUBLIC_APP_API_ADDRESS}/auth/`, config)
      .then(response2 => {
        return dispatch({
          type: SIGNED_IN,
          access: response.data.access,
          refresh: response.data.refresh,
          user: response2.data,
          messenger: ['success', 'เข้าสู่ระบบสำเร็จ', 'กรุณารอสักครู่']
        })
      }).catch((e) => {
        return dispatch({
          type: SIGN_IN_ERROR,
          error: ['เกิดข้อผิดพลาดกับระบบ', 'กรุณาแจ้งผู้ดูแล']
        })
      })
  }).catch((e) => {
    return dispatch({
      type: SIGN_IN_ERROR,
      error: ['เข้าสู่ระบบไม่สำเร็จ', 'ข้อมูลที่คุณให้นั้นไม่ถูกต้อง']
    })
  })
}

export const signOut = () => async dispatch => {
  return dispatch({
    type: SIGNED_OUT
  })
}
