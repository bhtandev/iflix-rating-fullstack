import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(thunk, logger)
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  return store;
}
