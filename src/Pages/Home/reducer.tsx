import * as homeConstants from './constants';
const initialState = {
  requesting: false,
  success: false,
  usersRecomment: null,
  error: null,
  loadingPage: false,
  articles: [],
  record: {},
  paging: {
    page: 1,
    limit: 10,
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case homeConstants.HOME_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case homeConstants.HOME_GET_USER_RECOMMENT_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case homeConstants.HOME_GET_ARTICLE_SUCCESS: {
      return { ...state, articles: [...action.payload] };
    }
    case 'PROFILE_POST_ARTICLE_SUCCESS': {
      let articles = [{ ...action.payload }, ...state.articles];
      debugger;
      return {
        ...state,
        articles,
        record: { text: '', images: [] },
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
