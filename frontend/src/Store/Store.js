import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import UserReducer from '../Reducers/UserReducer';
import ClinicReducer from '../Reducers/ClinicReducer';
import QueueReducer from '../Reducers/QueueReducer';
import ActiveClinicReducer from '../Reducers/ActiveClinicReducer';
import AppReducer from '../Reducers/AppReducer';
import NearestClinicReducer from '../Reducers/NearestClinic';
import MinNavBarReducer from '../Reducers/MinNavBarReducer';
import TriggerNotifReducer from '../Reducers/TriggerNotifReducer';

export let initStore = () => {

  const reducer = combineReducers({
    user: UserReducer,
    clinic: ClinicReducer,
    queue: QueueReducer,
    activeClinic: ActiveClinicReducer,
    notification: AppReducer,
    nearestClinicState: NearestClinicReducer ,
    minNavBar: MinNavBarReducer,
    trigger: TriggerNotifReducer,
    router: routerReducer
  });

  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  // Build the middleware for intercepting and dispatching navigation actions
  const historyWare = routerMiddleware(history);

  const store = createStore( reducer,
    compose(applyMiddleware(thunk,historyWare),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) )

  return [store,history];
}
