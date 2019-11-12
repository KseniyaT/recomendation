import CONSTANTS from '../../../constants/index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

import actions from '../../../actions/reviews/index';

describe('Actions: reviews', () => {

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

  it('getReviews success', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_REVIEWS}`).reply(200, {
      data: []
    });

    store.dispatch(actions.getReviews()).then(() => {
      let expectedActions = [
        { type: CONSTANTS.REVIEWS_REQUEST },
        { type: CONSTANTS.REVIEWS_SUCCESS, reviewsList: [] }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getReviews error', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_REVIEWS}`).reply(400, {
      message: CONSTANTS.MESSAGES.WENT_WRONG,
    });
    store.dispatch(actions.getReviews()).then(() => {
      let expectedActions = [
        { type: CONSTANTS.REVIEWS_REQUEST },
        { type: CONSTANTS.REVIEWS_ERROR, errorMsg: CONSTANTS.MESSAGES.WENT_WRONG }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
