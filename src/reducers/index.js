import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './auth';
import themes from './themes';
import reviews from './reviews';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth,
  themes,
  reviews,
});

export default createRootReducer;
