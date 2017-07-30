import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../index';
import { ConnectedRouter } from 'react-router-redux';

import Home from "../Home/Home";
import AccountPage from "../AccountPage/AccountPage";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import SeeQueue from "../SeeQueue/SeeQueue";
import Error from '../Error/Error';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/account"  component={AccountPage}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/seeQueue" component={SeeQueue}/>
            <Route component={Error}/>
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
