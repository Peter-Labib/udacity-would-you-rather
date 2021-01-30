import { SET_AUTHED_USER, SET_AUTH_REDIRECT_PATH } from './actionTypes'

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path,
  }
}
