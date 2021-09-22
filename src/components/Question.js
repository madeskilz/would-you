import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Question extends Component {
    render() {
        const { question, question: { optionOne: { text }, id }, user: { name, avatarURL } } = this.props
        if (question === null) return <p>This Question doesn't exist.</p>
        return (
            <Fragment>
                <h4 style={{ width: "100%", maxWidth: 390, padding: 10, display: "flex", margin: "0 auto", cursor: "pointer", }}>{name} asks:</h4>
                <div className="tweet">
                    <img src={avatarURL} alt={`Avatar of ${name}`} style={{ height: 80, borderRadius: "100%" }} />
                    <div className="tweet-info" style={{ borderLeft: "1px solid gray", paddingLeft: 10 }}>
                        <div>
                            <span>Would you rather?</span>
                            <p>...{text}...</p>
                            <div className="tweet-icons center">
                                <Link className="btn" to={`/questions/${id}`}>
                                    View Poll
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps({ users, questions }, { id }) {
    const question = questions[id]
    return {
        user: users[question.author],
        question
    }
}
export default connect(mapStateToProps)(Question);