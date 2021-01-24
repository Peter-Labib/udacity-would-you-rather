import { RECIEVE_USERS, ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from './actionTypes'

export const recieveUsers = (users) => {
    return {
        type: RECIEVE_USERS,
        users
    }
}

export const addAnswerToUser = (authedUser, qid, answer) => {
    return {
        type: ADD_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}

export const addQuestionToUser = (authedUser, qid) => {
    return {
        type: ADD_QUESTION_TO_USER,
        authedUser,
        qid
    }
}