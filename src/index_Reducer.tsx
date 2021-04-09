import { combineReducers } from 'redux';
import login from './Pages/Login/reducer';
import signUp from './Pages/Signup/reducer';
const rootReducer = combineReducers({ login, signUp });

export default rootReducer;
