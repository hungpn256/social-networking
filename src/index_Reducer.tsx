import { combineReducers } from 'redux';
import login from './Pages/Login/reducer';
import profile from './Pages/Profile/reducer';
import signUp from './Pages/Signup/reducer';
import home from './Pages/Home/reducer';
import conversationState from './Pages/Chat/shell/conversationsReducer';
import messagesState from './Pages/Chat/shell/messagesReducer';
const rootReducer = combineReducers({
  login,
  signUp,
  profile,
  home,
  conversationState,
  messagesState,
});

export default rootReducer;
