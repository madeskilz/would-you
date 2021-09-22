import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { unsetAuthedUser } from "../redux/actions/authedUser";
class Nav extends Component {
    handleLogout = () => {
        this.props.dispatch(unsetAuthedUser());
    }
    render() {
        return (
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add" exact activeClassName="active">
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/leaderboard" exact activeClassName="active">
                            Leader Board
                        </NavLink>
                    </li>
                    <li style={{ marginLeft: "auto", marginRight: "20px" }}>
                        <span>Hello, <b>{this.props.user.name}</b></span>
                        <img src={this.props.user.avatarURL} alt={this.props.user.name} className="avatar" />
                        <button style={{ background: "none", border: "none", marginLeft: 35, cursor: "pointer" }} onClick={this.handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }
}
function mapStateToProps({ authedUser, users }) {
    return {
        user: users[authedUser]
    }
}
export default connect(mapStateToProps)(Nav)