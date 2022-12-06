import * as homeConstants from './constants';
import * as profileConstant from '../Profile/constants';
import * as _ from 'lodash';
import IHome from '../../Models/home';
const initialState: IHome = {
  requesting: false,
  success: false,
  friend: [],
  error: null,
  articles: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case homeConstants.HOME_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case homeConstants.HOME_GET_FRIEND_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case homeConstants.HOME_GET_ARTICLE_SUCCESS: {
      return { ...state, articles: [...action.payload] };
    }
    case profileConstant.PROFILE_DELETE_ARTICLE_SUCCESS: {
      let articles = _.differenceBy([...state.articles], [{ ...action.payload }], '_id');
      return {
        ...state,
        articles,
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
    case 'CLEAR_STATE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
