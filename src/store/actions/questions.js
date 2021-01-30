import { RECIEVE_QUESTIONS, ADD_ANSWER, ADD_QUESTION } from './actionTypes'

export const recieveQuestions = (questions) => {
  return {
    type: RECIEVE_QUESTIONS,
    questions,
  }
}
export const addQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}

export const createQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  }
}
