import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
class Home extends Component {
    state = {
        category: "unanswered"
    }
    render() {
        const { questionIds, user } = this.props;
        const { category } = this.state;
        const answered = Object.keys(user.answers);
        return (
            <div>
                <div className="center">
                    <span style={{ cursor: "pointer" }} className={this.state.category === "unanswered" ? "active" : ""} onClick={() => {
                        this.setState({ category: "unanswered" });
                    }}>Unanswered</span>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <span style={{ cursor: "pointer" }} className={this.state.category === "answered" ? "active" : ""} onClick={() => {
                        this.setState({ category: "answered" });
                    }}>Answered</span>
                </div>
                <div>
                    <ul>
                        {category === "unanswered" && questionIds.filter((id) => !answered.includes(id)).map((id) => <li key={id}><Question id={id} /></li>)}
                        {category === "answered" && questionIds.filter((id) => answered.includes(id)).map((id) => <li key={id}><Question id={id} /></li>)}
                    </ul>
                </div>
            </div>
        )
    }
}
function mapStateToProps({ authedUser, users, questions }) {
    return {
        user: users[authedUser],
        questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}
export default connect(mapStateToProps)(Home);