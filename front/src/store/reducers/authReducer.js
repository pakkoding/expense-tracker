import { SIGNED_IN, SIGN_IN_ERROR, SIGNED_OUT } from '../constants'

const initialState = {
  username: null,
  password: null
}

export const authReducer = (state = initialState, action) => {
  if (action.type === SIGNED_IN) {
    sessionStorage.setItem('user', JSON.stringify(action.user))
    sessionStorage.setItem('refresh_token', action.refresh)
    return {
      ...state,
      access: action.access,
      refresh: action.refresh,
      loggedIn: true,
      user: action.user
    }
  } else if (action.type === SIGN_IN_ERROR) {
    return {
      ...state,
      access: '',
      refresh: '',
      loggedIn: false,
      user: null,
      error: action.error
    }
  } else if (action.type === SIGNED_OUT) {
    sessionStorage.clear()
    return {
      ...state,
      access: '',
      refresh: '',
      loggedIn: false,
      user: null
    }
  }
  // else if (action.type === SET_ACCESS_TOKEN) {
  //   return {
  //     ...state,
  //     access: action.access
  //   }
  // }
  return state
}
