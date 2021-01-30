import {
  RECIEVE_USERS,
  ADD_ANSWER_TO_USER,
  ADD_QUESTION_TO_USER,
} from '../actions/actionTypes'

const users = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer,
          },
        },
      }
    case ADD_QUESTION_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat(action.qid),
        },
      }
    default:
      return state
  }
}

export default users
