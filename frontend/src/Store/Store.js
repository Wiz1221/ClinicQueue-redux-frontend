import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from '../Reducers/UserReducer';
import ClinicReducer from '../Reducers/ClinicReducer';
import QueueReducer from '../Reducers/QueueReducer';
import ActiveClinicReducer from '../Reducers/ActiveClinicReducer';
import AppReducer from '../Reducers/AppReducer';


export let initStore = () => {

  const reducer = combineReducers({
    user: UserReducer,
    clinic: ClinicReducer,
    queue: QueueReducer,
    activeClinic: ActiveClinicReducer,
    notification: AppReducer
  });

  const store = createStore( reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) )

  return store;
}
