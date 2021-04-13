import { combineReducers } from 'redux';
import login from './Pages/Login/reducer';
import profile from './Pages/Profile/reducer';
import signUp from './Pages/Signup/reducer';

const rootReducer = combineReducers({ login, signUp, profile });

export default rootReducer;
