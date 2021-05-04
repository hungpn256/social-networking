import * as searchConstants from './constants';
import * as _ from 'lodash';
import ISearch from '../../Models/search';
const initialState: ISearch = {
  requesting: false,
  success: false,
  usersRecomment: null,
  error: null,
  loadingPage: false,
  articles: [],
  users: [],
  paging: {
    page: 1,
    limit: 10,
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case searchConstants.SEARCH_CHANGE_STATE: {
      return { ...state, ...action.payload };
    }
    case searchConstants.SEARCH_SUCCESS: {
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
