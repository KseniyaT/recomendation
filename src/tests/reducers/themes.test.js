import themes from '../../reducers/themes';
import CONSTANTS from '../../constants/index';

describe('Reducer: themes', () => {
  const initialState = {
    isThemeObjLoading: false,
    specificThemeObj: {},
    errorMsg: undefined,
    isThemeListLoading: true,
    themesList: [],
    themesErrorMsg: undefined,
    themesOffset: 0,
  };

  it('THEMES_REQUEST', () => {
    const action = { type: CONSTANTS.THEMES_REQUEST };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeListLoading: true,
    });
  });

  it('THEMES_SUCCESS', () => {
    const action = { type: CONSTANTS.THEMES_SUCCESS, themesList: [1, 2, 3,] };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeListLoading: false,
      themesList: [1, 2, 3,],
      themesOffset: 3,
      themesErrorMsg: '',
    });
  });

  it('THEMES_SUCCESS after Error', () => {
    const state = { ...initialState, themesErrorMsg: 'Message' };
    const action = { type: CONSTANTS.THEMES_SUCCESS, themesList: [1, 2, 3,] };
    expect(themes(state, action)).toEqual({
      ...state,
      isThemeListLoading: false,
      themesList: [1, 2, 3,],
      themesOffset: 3,
      themesErrorMsg: '',
    });
  });

  it('THEMES_ERROR', () => {
    const action = { type: CONSTANTS.THEMES_ERROR, errorMsg: 'Message' };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeListLoading: false,
      themesErrorMsg: 'Message',
    });
  });

  it('SPECIFIC_THEME_OBJ_REQUEST', () => {
    const action = { type: CONSTANTS.SPECIFIC_THEME_OBJ_REQUEST };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeObjLoading: true,
    });
  });

  it('SPECIFIC_THEME_OBJ_SUCCESS', () => {
    const action = { type: CONSTANTS.SPECIFIC_THEME_OBJ_SUCCESS, specificThemeList: [6543, 'Animals',] };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeObjLoading: false,
      specificThemeObj: { 6543: 'Animals' },
      errorMsg: '',
    });
  });

  it('SPECIFIC_THEME_OBJ_ERROR', () => {
    const action = { type: CONSTANTS.SPECIFIC_THEME_OBJ_ERROR, errorMsg: 'Message' };
    expect(themes(initialState, action)).toEqual({
      ...initialState,
      isThemeObjLoading: false,
      errorMsg: 'Message',
    });
  });

});