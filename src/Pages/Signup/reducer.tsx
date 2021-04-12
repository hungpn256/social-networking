import * as signUpConstants from './constants';
const initialState = {
  requesting: false,
  success: false,
  error: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case signUpConstants.SIGN_UP_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case signUpConstants.SIGN_UP_SUCCESS: {
      return { ...state, success: true };
    }
    case signUpConstants.SIGN_UP_FAIL: {
      return { ...state, error: action.payload };
    }
    case signUpConstants.SIGN_UP_CLEAR_STATE: {
      return { ...initialState };
    }
    case 'CLEAR_STATE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
