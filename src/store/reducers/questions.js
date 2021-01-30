import {
  RECIEVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION,
} from '../actions/actionTypes'

const questions = (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      }
    case ADD_ANSWER:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state
  }
}

export default questions
