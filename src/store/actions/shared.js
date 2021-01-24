import {
    recieveUsers,
    recieveQuestions,
    addQuestionAnswer,
    addAnswerToUser,
    addQuestionToUser,
    createQuestion
} from './index'
import { getInitialData, saveQuestionAnswer, saveQuestion } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const handleInitialData = () => dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, questions }) => {
        dispatch(recieveUsers(users))
        dispatch(recieveQuestions(questions))
        dispatch(hideLoading())
    })
}

export const questionAnswerHandler = (authedUser, qid, answer) => dispatch => {
    dispatch(showLoading())
    dispatch(addQuestionAnswer(authedUser, qid, answer))
    dispatch(addAnswerToUser(authedUser, qid, answer))
    return saveQuestionAnswer(
        authedUser,
        qid,
        answer
    ).then(e => dispatch(hideLoading()))
}

export const createQuestionHandler = (optionOneText, optionTwoText) => (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser
    }).then(question => {
        dispatch(createQuestion(question))
        dispatch(addQuestionToUser(authedUser, question.id))
        dispatch(hideLoading())
    })
}