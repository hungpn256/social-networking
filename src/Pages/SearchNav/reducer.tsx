import ISearch from '../../Models/search';
import * as searchConstants from './constants';
const initialState: ISearch = {
  requesting: false,
  success: false,
  error: null,
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
