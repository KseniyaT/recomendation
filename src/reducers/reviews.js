import CONSTANTS from '../constants/index';

const initialState = {
  isLoading: true,
  reviewsList: [],
  errorMsg: '',
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case CONSTANTS.REVIEWS_SUCCESS:
      const reviewsList = action.reviewsList;
      return {
        ...state,
        isLoading: false,
        reviewsList,
        errorMsg: initialState.errorMsg,
      };

    case CONSTANTS.REVIEWS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg,
      };

    default:
      return state;
  }
};

export default reviews;
