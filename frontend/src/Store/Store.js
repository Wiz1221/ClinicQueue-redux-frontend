import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from '../Reducers/User';
import ClinicReducer from '../Reducers/Clinic';
import QueueReducer from '../Reducers/Queue';
import ActiveClinicReducer from '../Reducers/ActiveClinic';
import AppReducer from '../Reducers/AppReducer';
import NearestClinicReducer from '../Reducers/NearestClinic';

export let initStore = () => {

  const reducer = combineReducers({
    user: UserReducer,
    clinic: ClinicReducer,
    queue: QueueReducer,
    activeClinic: ActiveClinicReducer,
    notification: AppReducer,
    nearestClinicBoolean: NearestClinicReducer 
  });

  const store = createStore( reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) )

  return store;
}
