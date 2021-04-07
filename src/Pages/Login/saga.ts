import {put,call,takeEvery} from 'redux-saga/effects'
import * as loginActions from './actions'
import services from './service'
import {toast} from 'react-toastify'
export  function* loginSaga({payload}){
  yield put(loginActions.changeState({requesting:true}));
  try{
    const res = yield call(services.login,payload);
    yield put(loginActions.loginSuccess(res.data));
    toast.success('Login success')
    debugger
  }
  catch(err){
    debugger
    yield put(loginActions.loginFail(err))
    toast.error('Login fail')
  }finally{
    yield put(loginActions.changeState({requesting:false}));
  }

}
