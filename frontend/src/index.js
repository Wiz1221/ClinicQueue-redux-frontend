import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import App from './Components/App/App';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './Store/Store';

// Actions
import { getClinic, activeClinic } from './Actions/ClinicAction';
import { getUser } from './Actions/UserAction';
import { getAllQueue } from './Actions/QueueAction';

// API
import {setUserLoginStatus} from './API/API';

// connected to createHistory declared in Store
const storeAndHistory = initStore()

//export store and history for use in actions and app.js
export const store = storeAndHistory[0];
export const history = storeAndHistory[1];

// local storage for user login status for entry to private route
store.subscribe( () => {
  const state = store.getState();
  setUserLoginStatus(state.user);
})

// get Clinic, User, Queue info when app initialise
store.dispatch(getClinic());
store.dispatch(getAllQueue());
store.dispatch(getUser());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
