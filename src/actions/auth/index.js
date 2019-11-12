import axios from 'axios';
import CONSTANTS from '../../constants/index';
import apiHelpers from '../../helpers/api';

const { getGatewayProtocol } = apiHelpers;

const authUserStart = () => {
  return {
    type: CONSTANTS.LOGIN_REQUEST,
  };
};

const authUserSuccess = () => {
  return {
    type: CONSTANTS.LOGIN_SUCCESS,
  };
};

const authUserError = (errorMsg) => {
  return {
    type: CONSTANTS.LOGIN_ERROR,
    errorMsg,
  };
};

const logoutUserSuccess = () => {
  return {
    type: CONSTANTS.LOGOUT,
  };
};

/**
 *
 * @param {Object} data - params for the request
 * @returns {function(*)} dispatch
 */
const loginUser = (data) => {
  const url = `${getGatewayProtocol()}${REACT_APP_ENDPOINT}${REACT_APP_LOGIN}`;

  return (dispatch) => {
    dispatch(authUserStart());

    return axios({
      method: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      data: JSON.stringify(data),
    })
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem('token', response?.data?.token);
          dispatch(authUserSuccess());
          window.location.href = REACT_APP_FEED;
        } else {
          dispatch(authUserError(response?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(authUserError(err?.response?.data?.message));
      });
  };
};

const logoutUser = () => {
  localStorage.removeItem('token');
  return (dispatch) => {
    dispatch(logoutUserSuccess());
    window.location.href = REACT_APP_LOGIN;
  };
};

export default { loginUser, logoutUser };
