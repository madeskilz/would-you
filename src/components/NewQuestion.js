import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../redux/actions/questions";
class NewQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const { optionOne, optionTwo } = this.state;
        const { authedUser, dispatch, history } = this.props;
        dispatch(handleAddQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: authedUser }));
        history.push("/");
    }
    render() {
        const { optionOne, optionTwo } = this.state;
        return (
            <Fragment>
                <div className="tweet" style={{ display: "unset", border: "none" }}>
                    <h3 className="center">Add New Question</h3>
                    <div className="tweet-info">
                        <div>
                            <p>Complete The Following: </p>
                            <span>Would you rather?</span>
                            <input type="text" value={optionOne} onChange={this.handleChange} className="select" name="optionOne" placeholder="Option One" />
                            <div style={{ fontWeight: "bold", padding: 10, textAlign: "center" }}>OR</div>
                            <input type="text" value={optionTwo} onChange={this.handleChange} className="select" name="optionTwo" placeholder="Option Two" />
                            <div className="tweet-icons center">
                                <button
                                    className="btn"
                                    disabled={optionOne && optionTwo ? false : true}
                                    onClick={this.handleSubmit}
                                >
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
function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(NewQuestion);