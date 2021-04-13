import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as profileActions from './actions';
import * as profileConstant from './constants';
import services from './service';
function* changeAvatarSaga({ payload }) {
  yield put(profileActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.changeAvatar, payload);
    yield put(profileActions.changeAvatarSuccess(res.data));
    toast.success('change avatar success');
  } catch (err) {
    yield put(profileActions.changeAvatarFail(err));
    toast.error('change avatar fail');
  } finally {
    yield put(profileActions.changeState({ requesting: false }));
  }
}
function* changeUserSaga({ payload }) {
  yield put(profileActions.changeState({ loadingPage: true }));
  try {
    const res = yield call(services.getProfileUser, payload);
    yield put(profileActions.getUserSuccess(res.data));
    toast.success('get profile success');
  } catch (err) {
    yield put(profileActions.getUserFail(err));
    toast.error('get profile fail');
  } finally {
    yield put(profileActions.changeState({ loadingPage: false }));
  }
}

export default function* watchProfileSaga() {
  yield takeLatest(profileConstant.PROFILE_CHANGE_AVATAR, changeAvatarSaga);
  yield takeLatest(profileConstant.GET_PROFILE_USER, changeUserSaga);
}
