import { showLoading, hideLoading } from "react-redux-loading";
import { _saveQuestion, _saveQuestionAnswer } from "../../utils/_DATA";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
function answerQuestion({ qid, authedUser, answer }) {
    return {
        type: ANSWER_QUESTION,
        qid, authedUser, answer
    }
}
export function handleAddQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestion(question)
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()));
    }
}
export function handleAnswerQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading());
        _saveQuestionAnswer(question)
            .then(() => dispatch(answerQuestion(question)))
            .then(() => dispatch(hideLoading()));
    }
}