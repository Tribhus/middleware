import { takeLatest, put, call } from 'redux-saga/effects';
import {
  APPROVE_USER, GET_PAGINATED_USERS,
  GET_USER_INFO,
  PROMOTE_USER, REJECT_USER,
} from '../constants/users';
import {
  approveUser, getPaginatedUsers,
  getUserInfo,
  promoteUser, rejectUser,
} from '../../database/users';
import {
  approveUserFailure,
  approveUserSuccess, getPaginatedUsersFailure, getPaginatedUsersSuccess,
  getUserInfoFailure,
  getUserInfoSuccess, promoteUserFailure, promoteUserSuccess, rejectUserFailure, rejectUserSuccess,
} from '../actions/users';

/*
function getUserSnapshots(userId) {
  return eventChannel((emitter) => {
    const subscription = usersCollection()
      .doc(userId)
      .onSnapshot((user) => {
        const userData = user.data();
        emitter(userData);
      });

    emitter(subscription);
  });
}

function* bgSync({ payload }) {
  const channel = yield call(getUserSnapshots, payload.id);
  const subscription = yield take(channel);

  try {
    while (true) {
      const userInfo = yield take(channel);
      yield put(updateLoggedUserInfo(userInfo));
    }
  } finally {
    subscription();
    yield put(actions.requestFailure('Sync cancelled!'));
  }
}
*/

function* getPaginatedUsersRequest({ payload }) {
  try {
    const bands = yield call(getPaginatedUsers, payload);
    yield put(getPaginatedUsersSuccess(bands));
  } catch (e) {
    yield put(getPaginatedUsersFailure(e));
  }
}

function* getUserInfoRequest({ payload }) {
  try {
    const userInfo = yield call(getUserInfo, payload);
    yield put(getUserInfoSuccess(userInfo));
  } catch (e) {
    yield put(getUserInfoFailure(e));
  }
}

function* getApproveUserRequest({ payload }) {
  try {
    yield call(approveUser, payload);
    yield put(approveUserSuccess());
  } catch (e) {
    yield put(approveUserFailure(e));
  }
}

function* getRejectUserRequest({ payload }) {
  try {
    yield call(rejectUser, payload);
    yield put(rejectUserSuccess());
  } catch (e) {
    yield put(rejectUserFailure(e));
  }
}

function* getPromoteUserRequest({ payload }) {
  try {
    yield call(promoteUser, payload);
    yield put(promoteUserSuccess());
  } catch (e) {
    yield put(promoteUserFailure(e));
  }
}

export default function* usersSaga() {
  yield takeLatest(GET_PAGINATED_USERS, getPaginatedUsersRequest);
  yield takeLatest(GET_USER_INFO, getUserInfoRequest);
  yield takeLatest(APPROVE_USER, getApproveUserRequest);
  yield takeLatest(REJECT_USER, getRejectUserRequest);
  yield takeLatest(PROMOTE_USER, getPromoteUserRequest);
}
