import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Skeleton from './hoc/Skeleton';
import { Spin } from 'antd';
import PizzaMaker from './container/PizzaMaker/PizzaMaker';
import Auth from './container/Auth/Auth';

import Chat from './container/Chat/Chat';
import Profile from './container/Profile/Profile';
import Landing from './container/Landing/Landing';
// import NotFound from './components/NotFound'
import Logout from './components/Logout';
import { authCheck, authLogout } from './store/actions/auth';

class App extends Component {
  // componentDidMount () {   this.props.onTryAutoSignup(); }
  componentWillMount = () => {
    this.props.authCheck();
  };

  render() {
    let routes = (
      <div className="header">
        <Spin size="large" />
      </div>
    );

    if (!this.props.isLoggedIn && this.props.loaded) {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={PizzaMaker} />

          <Redirect to="/" />
        </Switch>
      );
    }
    if (this.props.isLoggedIn && this.props.loaded) {
      routes = (
        <Switch>
          {this.props.isAdmin ? (
            <Route path="/landing" component={Landing} />
          ) : null}
          <Route path="/chat" component={Chat} />

          <Route path="/profile" exact component={Profile} />
          <Route
            path="/logout"
            render={props => {
              return <Logout {...props} logout={() => this.props.logout()} />;
            }}
          />

          <Route path="/" exact component={PizzaMaker} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Skeleton>{routes}</Skeleton>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isAdmin: state.auth.isAdmin,
    loaded: state.auth.loaded
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authCheck: () => dispatch(authCheck()),
    logout: () => dispatch(authLogout())
  };
};
// const mapStateToProps = state => {   return {     isAuthenticated:
// state.auth.token !== null   }; }; const mapDispatchToProps = dispatch => {
// return {     onTryAutoSignup: () => dispatch( actions.authCheckState() )   };
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
