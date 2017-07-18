import { createStore, compose, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

export let initStore = () => {

  const reducer = combineReducers({
    // restaurants: RestaurantReducer,


  });

  const store = createStore( reducer,     
    compose(applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ) )

  return store;
}
