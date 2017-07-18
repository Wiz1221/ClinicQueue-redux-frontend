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
//API
// import {setAdmin, getAdmin} from './API/generalAPI';

const store = initStore();

// store.subscribe( () => {
//   const state = store.getState();
//   setAdmin(state.admin);
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
