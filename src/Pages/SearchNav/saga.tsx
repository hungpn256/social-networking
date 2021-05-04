import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as searchActions from './actions';
import * as searchConstant from './constants';
import services from './service';
function* searchSaga({ payload }: AnyAction) {
  yield put(searchActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.search, payload);
    yield put(searchActions.searchSuccess(res.data.result));
  } catch (err) {
    searchActions.searchFail(err);
  } finally {
    yield put(searchActions.changeState({ requesting: false }));
  }
}
export default function* watchsearchSaga() {
  yield takeLatest(searchConstant.SEARCH, searchSaga);
}
