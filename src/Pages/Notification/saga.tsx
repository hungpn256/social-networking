import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_NOTIFICATION_UNSEEN, GET_NOTIFICATION_UNSEEN_SUCCESS } from './constants';
import { getUnseen } from './service';

function* getUnseenSaga(): any {
  try {
    const res = yield call(getUnseen);
    yield put({
      type: GET_NOTIFICATION_UNSEEN_SUCCESS,
      payload: {
        totalUnseen: res.data.total,
      },
    });
  } catch (err) {
    toast.error('getUnseen fail');
  }
}

export default function* watchNotificationSaga() {
  yield takeLatest(GET_NOTIFICATION_UNSEEN, getUnseenSaga);
}
