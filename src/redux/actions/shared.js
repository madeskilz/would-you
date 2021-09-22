import { showLoading, hideLoading } from "react-redux-loading";
import { _getQuestions, _getUsers } from "../../utils/_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export const handleInitialData = () => (dispatch) => {
    dispatch(showLoading());
    _getUsers().then(users => dispatch(receiveUsers(users)));
    _getQuestions()
        .then((questions) => dispatch(receiveQuestions(questions)))
        .then(() => dispatch(hideLoading()));
}