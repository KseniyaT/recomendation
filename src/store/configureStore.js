import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers/index';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) { // eslint-disable-line require-jsdoc
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      ),
    ),
  );

  return store;
}
