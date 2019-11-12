import auth from '../../reducers/auth';
import CONSTANTS from '../../constants/index';

describe('Reducer: auth', () => {
  const initialState = {
    isLoading: false,
    errorMsg: undefined,
  };

  it('LOGIN_REQUEST', () => {
    const action = { type: CONSTANTS.LOGIN_REQUEST };
    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('LOGIN_SUCCESS', () => {
    const action = { type: CONSTANTS.LOGIN_SUCCESS };
    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('LOGIN_ERROR', () => {
    const action = { type: CONSTANTS.LOGIN_ERROR, errorMsg: 'Message' };
    expect(auth(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      errorMsg: 'Message',
    });
  });

});