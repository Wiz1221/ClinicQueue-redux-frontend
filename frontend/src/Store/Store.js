import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import UserReducer from '../Reducers/User';
import ClinicReducer from '../Reducers/Clinic';
import thunk from 'redux-thunk';

export let initStore = () => {

  const reducer = combineReducers({
    user: UserReducer,
    clinic: ClinicReducer,


  });

  const store = createStore( reducer,
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) )

  return store;
}
