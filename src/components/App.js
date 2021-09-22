import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { handleInitialData } from "../redux/actions/shared";
import Home from "./Home";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Nav from "./Nav";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";
import _404 from "./_404";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Fragment>
        <LoadingBar />
        <BrowserRouter>
          {
            this.props.auth
              ? (<div className="container">
                <Nav />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/add" exact component={NewQuestion} />
                  <Route path="/leaderboard" exact component={LeaderBoard} />
                  <Route path="/questions/:question_id" exact component={QuestionPage} />
                  <Route component={_404} />
                </Switch>
              </div>)
              : (<Login />)
          }
        </BrowserRouter >
      </Fragment>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    auth: authedUser !== null
  }
}
export default connect(mapStateToProps)(App);
