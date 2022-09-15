import * as loginConstants from './constants';
import * as profileConstant from '../Profile/constants';
import axios from 'axios';
import ILogin from '../../Models/login';
const initialState: ILogin = {
  requesting: false,
  success: false,
  user: null,
  token: localStorage.getItem('token') ?? '',
  error: null,
};

const reducer = (state = initialState, action: any): ILogin => {
  switch (action.type) {
    case loginConstants.LOGIN_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case loginConstants.LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return { ...state, user, token, success: true };
    }
    case loginConstants.LOGIN_FAIL: {
      const { error } = action.payload;
      return { ...state, error };
    }
    case loginConstants.GET_USER: {
      const { payload } = action;
      return { ...state, ...payload };
    }
    // profile change
    case profileConstant.PROFILE_CHANGE_AVATAR_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_STATE': {
      axios.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('token');
      return { ...initialState, token: '' };
    }
    default:
      return { ...state };
  }
};
export default reducer;
