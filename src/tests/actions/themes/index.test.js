import CONSTANTS from '../../../constants/index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

import actions from '../../../actions/themes/index';

describe('Actions: themes', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('getThemes success', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}`).reply(200, {
      data: []
    });

    store.dispatch(actions.getThemes()).then(() => {
      let expectedActions = [
        { type: CONSTANTS.THEMES_REQUEST },
        { type: CONSTANTS.THEMES_SUCCESS, themesList: [] }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getThemes error', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}`).reply(400, {
      message: CONSTANTS.MESSAGES.WENT_WRONG,
    });
    store.dispatch(actions.getThemes()).then(() => {
      let expectedActions = [
        { type: CONSTANTS.THEMES_REQUEST },
        { type: CONSTANTS.THEMES_ERROR, errorMsg: CONSTANTS.MESSAGES.WENT_WRONG }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getSpecificThemeObj success', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}/12`).reply(200, {
      data: { name: 'Animals' }
    });

    store.dispatch(actions.getSpecificThemeObj(12)).then(() => {
      let expectedActions = [
        { type: CONSTANTS.SPECIFIC_THEME_OBJ_REQUEST },
        { type: CONSTANTS.SPECIFIC_THEME_OBJ_SUCCESS, specificThemeList: [ 12, 'Animals', ] }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getSpecificThemeObj error', () => {
    mock.onGet(`http://${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}/12`).reply(400, {
      message: CONSTANTS.MESSAGES.WENT_WRONG,
    });
    store.dispatch(actions.getSpecificThemeObj(12)).then(() => {
      let expectedActions = [
        { type: CONSTANTS.SPECIFIC_THEME_OBJ_REQUEST },
        { type: CONSTANTS.SPECIFIC_THEME_OBJ_ERROR, errorMsg: CONSTANTS.MESSAGES.WENT_WRONG }
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
