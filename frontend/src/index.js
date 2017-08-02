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

//API
import {setUserLoginStatus} from './API/API';


const storeAndHistory = initStore()
export const store = storeAndHistory[0];
export const history = storeAndHistory[1];

store.subscribe( () => {
  const state = store.getState();
  setUserLoginStatus(state.user);
})


store.dispatch(getClinic());
store.dispatch(getAllQueue());
store.dispatch(getUser());

// get latest activeClinic from localStorage for persistence
//store.dispatch(activeClinic(getActiveClinic()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
