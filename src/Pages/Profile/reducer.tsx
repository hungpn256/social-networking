import * as profileConstant from './constants';
const initialState = {
  requesting: false,
  success: false,
  user: null,
  error: null,
  editting: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case profileConstant.PROFILE_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case profileConstant.PROFILE_CHANGE_AVATAR_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_STATE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
