import { combineReducers } from 'redux';
import UsersReducer from './users';
import PlayerReducer from './player';

export default combineReducers({
  users: UsersReducer,
  player: PlayerReducer,
});
