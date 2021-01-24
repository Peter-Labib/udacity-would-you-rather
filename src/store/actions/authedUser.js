import { SET_AUTHED_USER } from './actionTypes'

export const setAuthedUser = (id) => {
    return {
        type: SET_AUTHED_USER,
        id
    }
}