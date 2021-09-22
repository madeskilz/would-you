import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
class Leader extends Component {
    render() {
        if (this.props.user === null) return <p>This User doesn't exist.</p>
        const { user: { name, avatarURL, answers, questions } } = this.props
        return (
            <Fragment>
                <div className="tweet">
                    <img src={avatarURL} alt={`Avatar of ${name}`} style={{ height: 80, borderRadius: "100%" }} />
                    <div className="tweet-info" style={{ borderLeft: "1px solid gray", paddingLeft: 10 }}>
                        <div>
                            <span>{name}</span>
                            <p>Answered Questions: {Object.keys(answers).length}</p>
                            <p>Created Questions: {questions.length}</p>

                        </div>
                    </div>
                    <div style={{ borderLeft: "1px solid gray", paddingLeft: 10, textAlign: "center" }}>
                        <h4>Score</h4>
                        <h2>{Object.keys(answers).length + questions.length}</h2>
                    </div>
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps({ users }, { id }) {
    return {
        user: users[id],
    }
}
export default connect(mapStateToProps)(Leader);