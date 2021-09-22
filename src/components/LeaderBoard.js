import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Leader from "./Leader";
class LeaderBoard extends Component {
    render() {
        return (
            <Fragment>
                <div className="tweet" style={{ display: "unset", border: "none" }}>
                    {this.props.userIds.map((id) => <li key={id}><Leader id={id} /></li>)}
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps({ users }) {
    return {
        userIds: Object.keys(users).sort((a, b) => (
            (Object.keys(users[b].answers).length + users[b].questions.length) -
            (Object.keys(users[a].answers).length + users[a].questions.length)
        ))
    }
}
export default connect(mapStateToProps)(LeaderBoard);