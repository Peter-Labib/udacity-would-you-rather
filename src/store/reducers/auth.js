import { SET_AUTHED_USER, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes'

const initialState = {
  authedUser: null,
  authRedirectPath: '/',
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.id,
      }
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      }
    default:
      return state
  }
}

export default auth
