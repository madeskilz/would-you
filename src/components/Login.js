import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../redux/actions/authedUser";

class Login extends Component {
    state = {
        username: ""
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value })
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.props.dispatch(setAuthedUser(this.state.username))
    }
    render() {
        const { users, userIds } = this.props;
        const { username } = this.state;
        return (
            <div className="container loginBox center">
                <h3>Welcome to the Would-You-Rather Game Portal</h3>
                <h4>Login</h4>
                <select className="select" value={username} onChange={this.handleChange}>
                    <option value="">Select Username</option>
                    {this.props.users && userIds.map((id) => <option value={id} key={id}>{`${users[id].name} (${id})`}</option>)}
                </select>
                <button
                    className="btn"
                    disabled={username === ""}
                    onClick={this.handleLogin}
                >
                    Login
                </button>
            </div>
        )
    }
}
function mapStateToProps({ users }) {
    return { users, userIds: Object.keys(users) }
}
export default connect(mapStateToProps)(Login);