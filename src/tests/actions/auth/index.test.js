import CONSTANTS from '../../../constants/index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

import actions from '../../../actions/auth/index';

describe('Actions: auth', () => {

  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      href: null,
    },
    writable: true,
  });

  beforeEach(() => {
    store.clearActions();
  });

  it('loginUser success', () => {
    mock.onPost(`http://${REACT_APP_ENDPOINT}${REACT_APP_LOGIN}`).reply(200, {
      token: 'Token'
    });

    store.dispatch(actions.loginUser({ username: 'test', password: 'test' })).then(() => {
      let expectedActions = [
        { type: CONSTANTS.LOGIN_REQUEST },
        { type: CONSTANTS.LOGIN_SUCCESS }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('loginUser error', () => {
    mock.onPost(`http://${REACT_APP_ENDPOINT}${REACT_APP_LOGIN}`).reply(400, {
      message: 'Message',
    });
    store.dispatch(actions.loginUser({ username: 'test', password: 'test' })).then(() => {
      let expectedActions = [
        { type: CONSTANTS.LOGIN_REQUEST },
        { type: CONSTANTS.LOGIN_ERROR, errorMsg: 'Message' }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('logoutUser', () => {
    store.dispatch(actions.logoutUser());
    let expectedActions = [ { type: 'LOGOUT' } ];
    expect(store.getActions()).toEqual(expectedActions);
  });

});