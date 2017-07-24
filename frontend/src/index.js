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
import { getClinic } from './Actions/Clinic';
import { getUser } from './Actions/User';
//API
// import {setAdmin, getAdmin} from './API/generalAPI';

export const store = initStore();

// store.subscribe( () => {
//   const state = store.getState();
//   setAdmin(state.admin);
// })


store.dispatch(getClinic());

// store.dispatch(getUser());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
