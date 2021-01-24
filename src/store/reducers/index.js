import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import users from './users'
import questions from './questions'
import authedUser from './authedUser'

export default combineReducers({
    loadingBar: loadingBarReducer,
    users,
    questions,
    authedUser
})
