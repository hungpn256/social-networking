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

export default function* watchProfileSaga() {
  yield takeLatest(profileConstant.PROFILE_CHANGE_AVATAR, changeAvatarSaga);
}
