import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../index';
import { ConnectedRouter } from 'react-router-redux';

import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import SeeQueue from "../SeeQueue/SeeQueue";
import Error from '../Error/Error';
import MyAccount from '../AccountPage/AccountPage';
import { getUserLoginStatus } from '../../API/API';


import './App.css';

class App extends Component {

  render() {

    const userLoginStatus = getUserLoginStatus();

    const fakeAuth = {
        isAuthenticated: userLoginStatus === 'user is logged in' ? true : false
    }


    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route path="/seeQueue/:name" component={SeeQueue}/>
            <PrivateRoute exact path="/myAccount" component={MyAccount}/>
            <Route component={Error}/>
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}


const userLoginStatus = getUserLoginStatus();

const fakeAuth = {
  isAuthenticated: userLoginStatus === 'user is logged in' ? true : false
}

const isAuth = () => {
    return getUserLoginStatus() === 'user is logged in' ? true : false
}


const PrivateRoute = ({ component: Component, ...rest }) => (


  <Route {...rest} render={
    props => (

    isAuth() ?
    (
      <Component {...props}/>
    )
    : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(App);
