import { combineReducers } from 'redux';
import login from './Pages/Login/reducer';
import profile from './Pages/Profile/reducer';
import signUp from './Pages/Signup/reducer';
import home from './Pages/Home/reducer';
import search from './Pages/SearchNav/reducer';
import conversation from './Pages/Chat/reducer';
import notification from './Pages/Notification/reducer';
const rootReducer = combineReducers({
  login,
  signUp,
  profile,
  home,
  search,
  conversation,
  notification,
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
