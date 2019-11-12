import reviews from '../../reducers/reviews';
import CONSTANTS from '../../constants/index';

describe('Reducer: reviews', () => {
  const initialState = {
    isLoading: true,
    reviewsList: [],
    errorMsg: '',
  };

  it('REVIEWS_REQUEST', () => {
    const action = { type: CONSTANTS.REVIEWS_REQUEST };
    expect(reviews(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('REVIEWS_SUCCESS', () => {
    const action = { type: CONSTANTS.REVIEWS_SUCCESS, reviewsList: [1, 2, 3,] };
    expect(reviews(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      reviewsList: [1, 2, 3,],
      errorMsg: ''
    });
  });

  it('REVIEWS_SUCCESS after error', () => {
    const state = { ...initialState, themesErrorMsg: 'Message' };
    const action = { type: CONSTANTS.REVIEWS_SUCCESS, reviewsList: [1, 2, 3,] };
    expect(reviews(state, action)).toEqual({
      ...state,
      isLoading: false,
      reviewsList: [1, 2, 3,],
      errorMsg: ''
    });
  });

  it('REVIEWS_ERROR', () => {
    const action = { type: CONSTANTS.REVIEWS_ERROR, errorMsg: 'Message' };
    expect(reviews(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      errorMsg: 'Message',
    });
  });

});