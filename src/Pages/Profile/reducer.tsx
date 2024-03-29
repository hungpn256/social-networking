import * as profileConstant from './constants';
import * as _ from 'lodash';
import Iprofile from '../../Models/profile';
const initialState: Iprofile = {
  requesting: false,
  success: false,
  user: null,
  error: null,
  editting: false,
  loadingPage: false,
  articles: [],
  record: {
    text: '',
    files: [],
  },
  paging: {
    page: 1,
    limit: 10,
  },
  friendStatus: undefined,
};

const reducer = (state = initialState, action: any): Iprofile => {
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
    case profileConstant.PROFILE_GET_ARTICLES_SUCCESS: {
      return {
        ...state,
        articles: action.payload,
      };
    }
    case profileConstant.PROFILE_POST_ARTICLE_SUCCESS: {
      let articles = [{ ...action.payload }, ...state.articles];
      return {
        ...state,
        articles,
        record: { text: '', files: [] },
      };
    }
    case profileConstant.PROFILE_DELETE_ARTICLE_SUCCESS: {
      let articles = _.differenceBy([...state.articles], [{ ...action.payload }], '_id');
      return {
        ...state,
        articles,
      };
    }
    case profileConstant.PROFILE_CHANGE_COVER_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case 'CLEAR_STATE': {
      return { ...state };
    }
    case 'CLEAR_STATE_PROFILE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
