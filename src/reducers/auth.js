import CONSTANTS from '../constants/index';

const initialState = {
  isLoading: false,
  errorMsg: undefined,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CONSTANTS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMsg: initialState.errorMsg,
      };

    case CONSTANTS.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    case CONSTANTS.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default auth;
