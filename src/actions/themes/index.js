import axios from 'axios';
import CONSTANTS from '../../constants/index';
import apiHelpers from '../../helpers/api';

const { getGatewayProtocol, objToSearchQuery } = apiHelpers;

const getThemesStart = () => {
  return {
    type: CONSTANTS.THEMES_REQUEST,
  };
};

const getThemesSuccess = (themesList) => {
  return {
    type: CONSTANTS.THEMES_SUCCESS,
    themesList,
  };
};

const getThemesError = (errorMsg) => {
  return {
    type: CONSTANTS.THEMES_ERROR,
    errorMsg,
  };
};

const getSpecificThemeObjStart = () => {
  return {
    type: CONSTANTS.SPECIFIC_THEME_OBJ_REQUEST,
  };
};

const getSpecificThemeObjSuccess = (specificThemeList) => {
  return {
    type: CONSTANTS.SPECIFIC_THEME_OBJ_SUCCESS,
    specificThemeList,
  };
};

const getSpecificThemeObjError = (errorMsg) => {
  return {
    type: CONSTANTS.SPECIFIC_THEME_OBJ_ERROR,
    errorMsg,
  };
};

/**
 * It gets list of themes
 * @param {{offset: number, limit: number}} obj - optional argument to search query;
 * offset - offset for the theme request
 * limit - limit for the theme request
 * @returns {function(*)} dispatch
 */
const getThemes = (obj) => {
  const params = objToSearchQuery(obj);
  const url = `${getGatewayProtocol()}${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}${params}`;

  return (dispatch) => {
    dispatch(getThemesStart());

    return axios({
      method: 'get',
      url,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getThemesSuccess(response?.data?.data));
        } else {
          dispatch(getThemesError(response?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(getThemesError(err?.response?.data?.message));
      });
  };
};

const getSpecificThemeObj = (id) => {
  const url = `${getGatewayProtocol()}${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_THEMES}/${id}`;

  return (dispatch) => {
    dispatch(getSpecificThemeObjStart());

    return axios({
      method: 'get',
      url,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getSpecificThemeObjSuccess([id, response?.data?.data?.name]));
        } else {
          dispatch(getSpecificThemeObjError(response?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(getSpecificThemeObjError(err?.response?.data?.message));
      });
  };
};


export default { getThemes, getSpecificThemeObj };
