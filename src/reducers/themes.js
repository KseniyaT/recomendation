import CONSTANTS from '../constants/index';

const initialState = {
  isThemeObjLoading: false,
  specificThemeObj: {},
  errorMsg: '',
  isThemeListLoading: true,
  themesList: [],
  themesErrorMsg: '',
  themesOffset: 0,
};

const themes = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.THEMES_REQUEST:
      return {
        ...state,
        isThemeListLoading: true,
      };

    case CONSTANTS.THEMES_SUCCESS:
      const themesList = [...state.themesList, ...action.themesList];
      return {
        ...state,
        isThemeListLoading: false,
        themesList,
        themesOffset: themesList.length,
        themesErrorMsg: initialState.errorMsg,
      };

    case CONSTANTS.THEMES_ERROR:
      return {
        ...state,
        isThemeListLoading: false,
        themesErrorMsg: action.errorMsg,
      };

    case CONSTANTS.SPECIFIC_THEME_OBJ_REQUEST:
      return {
        ...state,
        isThemeObjLoading: true,
      };

    case CONSTANTS.SPECIFIC_THEME_OBJ_SUCCESS:
      const specificThemeObj = {
        ...state.specificThemeObj,
        [action.specificThemeList[0]]: action.specificThemeList[1],
      };
      return {
        ...state,
        isThemeObjLoading: false,
        specificThemeObj,
        errorMsg: initialState.errorMsg,
      };

    case CONSTANTS.SPECIFIC_THEME_OBJ_ERROR:
      return {
        ...state,
        isThemeObjLoading: false,
        errorMsg: action.errorMsg,
      };

    default:
      return state;
  }
};

export default themes;
