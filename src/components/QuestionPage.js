import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Poll from "./Poll";
class QuestionPage extends Component {
    render() {
        if (!this.props.question) return <Redirect to="/404" />
        const { id } = this.props.question;
        return (
            <Fragment>
                <div className="tweet" style={{ display: "unset", border: "none" }}>
                    <Poll id={id} />
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps({ questions }, props) {
    const question = questions[props.match.params.question_id]
    return {
        question
    }
}
export default connect(mapStateToProps)(QuestionPage);