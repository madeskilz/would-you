import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../redux/actions/questions";
class Poll extends Component {
    state = {
        answer: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const { authedUser, question, dispatch } = this.props;
        const { answer } = this.state;
        dispatch(handleAnswerQuestion({ qid: question.id, authedUser: authedUser.id, answer }));
    }
    render() {
        const { question, question: { optionOne, optionTwo, id }, user: { name, avatarURL }, authedUser } = this.props;
        const { answer } = this.state;
        const answered = Object.keys(authedUser.answers);
        if (question === null) return <p>This Poll doesn't exist.</p>
        if (answered.includes(id)) {
            const userAnswer = authedUser.answers[id];
            const totalVote = optionOne.votes.length + optionTwo.votes.length;
            return (
                <Fragment>
                    <h4 style={{ width: "100%", maxWidth: 390, padding: 10, display: "flex", margin: "0 auto", cursor: "pointer", }}>Asked by {name}</h4>
                    <div className="tweet">
                        <img src={avatarURL} alt={`Avatar of ${name}`} style={{ height: 80, borderRadius: "100%" }} />
                        <div className="tweet-info" style={{ borderLeft: "1px solid gray", paddingLeft: 10 }}>
                            <div>
                                <span>Result:<small style={{ fontStyle: "italic" }}>the green dot is your answer.</small></span>
                                <p><span>{optionOne.text}</span></p>{userAnswer === "optionOne" && <div className="userAnswer" />}
                                <div className="votes">
                                    <div style={{ height: 20, backgroundColor: "#ffdc3f", width: `${(optionOne.votes.length / totalVote) * 100}%` }} />
                                    <span>{optionOne.votes.length} of {totalVote}</span>
                                </div>
                                <p><span>{optionTwo.text}</span></p>{userAnswer === "optionTwo" && <div className="userAnswer" />}
                                <div className="votes">
                                    <div style={{ height: 20, backgroundColor: "#ffdc3f", width: `${(optionTwo.votes.length / totalVote) * 100}%` }} />
                                    <span>{optionTwo.votes.length} of {totalVote}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <h4 style={{ width: "100%", maxWidth: 390, padding: 10, display: "flex", margin: "0 auto", cursor: "pointer", }}>{name} asks:</h4>
                <div className="tweet">
                    <img src={avatarURL} alt={`Avatar of ${name}`} style={{ height: 80, borderRadius: "100%" }} />
                    <div className="tweet-info" style={{ borderLeft: "1px solid gray", paddingLeft: 10 }}>
                        <div>
                            <span>Would you rather?</span>
                            <p><label><input type="radio" name="answer" onChange={this.handleChange} value="optionOne" />{optionOne.text}</label></p>
                            <p><label><input type="radio" name="answer" onChange={this.handleChange} value="optionTwo" />{optionTwo.text}</label></p>
                            <div className="tweet-icons center">
                                <button className="btn" disabled={answer === ""} onClick={this.handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    return {
        authedUser: users[authedUser],
        user: users[question.author],
        question
    }
}
export default connect(mapStateToProps)(Poll);