import * as profileConstant from './constants';
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
    case profileConstant.HOME_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case profileConstant.HOME_GET_USER_RECOMMENT_SUCCESS: {
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
