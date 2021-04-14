import * as profileConstant from './constants';
const initialState = {
  requesting: false,
  success: false,
  user: null,
  error: null,
  editting: false,
  loadingPage: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case profileConstant.PROFILE_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case profileConstant.PROFILE_CHANGE_AVATAR_SUCCESS: {
      return { ...state, ...action.payload };
    }

    case profileConstant.PROFILE_CHANGE_AVATAR_FAIL: {
      return { ...state, ...action.payload };
    }

    case profileConstant.GET_PROFILE_USER_SUCCESS: {
      return { ...state, ...action.payload };
    }

    case profileConstant.GET_PROFILE_USER_FAIL: {
      return { ...state, ...action.payload };
    }

    case 'CLEAR_STATE_PROFILE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
