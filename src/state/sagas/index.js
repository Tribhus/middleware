import { spawn } from 'redux-saga/effects';
import UsersRootSaga from './users';
import PlayerRootSaga from './player'; // eslint-disable-line import/no-cycle

function* rootSaga() {
  yield spawn(UsersRootSaga);
  yield spawn(PlayerRootSaga);
}

export default rootSaga;
