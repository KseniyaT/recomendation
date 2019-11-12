import axios from 'axios';
import { getAssociatedThemeObject } from '../../helpers/feed';
import themeActions from '../themes/index';
import CONSTANTS from '../../constants/index';
import apiHelpers from '../../helpers/api';

const { getGatewayProtocol, objToSearchQuery } = apiHelpers;

const { getSpecificThemeObj } = themeActions;

const getReviewsStart = () => {
  return {
    type: CONSTANTS.REVIEWS_REQUEST,
  };
};

const getReviewsSuccess = (reviewsList) => {
  return {
    type: CONSTANTS.REVIEWS_SUCCESS,
    reviewsList,
  };
};

const getReviewsError = (errorMsg) => {
  return {
    type: CONSTANTS.REVIEWS_ERROR,
    errorMsg,
  };
};

/**
 * It gets list of reviews
 * @param {{offset: number, limit: number}} obj - optional argument to search query;
 * offset - offset for the review request
 * limit - limit for the review request
 * @returns {function(*)} dispatch
 */
const getReviews = (obj) => {
  const params = objToSearchQuery(obj);
  const url = `${getGatewayProtocol()}${REACT_APP_ENDPOINT}${REACT_APP_API}${REACT_APP_REVIEWS}${params}`;

  return (dispatch) => {
    dispatch(getReviewsStart());

    return axios({
      method: 'get',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response?.status === 200) {
          const associatedThemeObject = getAssociatedThemeObject(response.data.data);
          Object.keys(associatedThemeObject).forEach((key) => {
            dispatch(getSpecificThemeObj(key));
          });
          dispatch(getReviewsSuccess(response?.data?.data));
        } else {
          dispatch(getReviewsError(response?.data?.message));
        }
      })
      .catch((err) => {
        const message = err?.response?.data?.message || CONSTANTS.MESSAGES.WENT_WRONG;
        const code = err?.response?.data?.code;
        dispatch(getReviewsError(message));
        if (code === 401) {
          window.location.href = REACT_APP_LOGIN;
        }
      });
  };
};


export default { getReviews };
