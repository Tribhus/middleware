import { fromJS } from 'immutable';
import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  APPROVE_USER,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAILURE,
  PROMOTE_USER,
  PROMOTE_USER_SUCCESS,
  PROMOTE_USER_FAILURE,
  GET_PAGINATED_USERS,
  GET_PAGINATED_USERS_SUCCESS,
  GET_PAGINATED_USERS_FAILURE,
  UPDATE_LOGGED_USER_INFO,
  UPDATE_LOGGED_USER_DATA,
  REJECT_USER,
  REJECT_USER_SUCCESS,
  REJECT_USER_FAILURE,
} from '../constants/users';

const initialState = fromJS({
  paginatedUsers: {},
  approveUser: {},
  rejectUser: {},
  promoteUser: {},
  loggedUser: {},
  userInfo: {},
});

const usersReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_PAGINATED_USERS:
      return state
        .setIn(['paginatedUsers', 'loading'], true)
        .setIn(['paginatedUsers', 'status'], 'waiting')
        .setIn(['paginatedUsers', 'error'], null);
    case GET_PAGINATED_USERS_SUCCESS:
      newState = action.payload.reduce(
        (total, user) => total.setIn(['paginatedUsers', 'data', user.id], user),
        state,
      );
      return newState
        .setIn(['paginatedUsers', 'loading'], false)
        .setIn(['paginatedUsers', 'status'], 'success')
        .setIn(['paginatedUsers', 'error'], null);
    case GET_PAGINATED_USERS_FAILURE:
      return state
        .setIn(['paginatedUsers', 'loading'], false)
        .setIn(['paginatedUsers', 'status'], 'failure')
        .setIn(['paginatedUsers', 'error'], action.payload);
    case GET_USER_INFO:
      return state
        .setIn(['userInfo', 'loading'], false)
        .setIn(['userInfo', 'status'], 'waiting')
        .setIn(['userInfo', 'error'], null)
        .setIn(['userInfo', 'data'], {});
    case GET_USER_INFO_SUCCESS:
      return state
        .setIn(['userInfo', 'loading'], false)
        .setIn(['userInfo', 'status'], 'success')
        .setIn(['userInfo', 'error'], null)
        .setIn(['userInfo', 'data'], action.payload);
    case GET_USER_INFO_FAILURE:
      return state
        .setIn(['userInfo', 'loading'], false)
        .setIn(['userInfo', 'status'], 'failure')
        .setIn(['userInfo', 'error'], action.payload)
        .setIn(['userInfo', 'data'], {});
    case APPROVE_USER:
      return state
        .setIn(['approveUser', 'loading'], true)
        .setIn(['approveUser', 'status'], 'waiting')
        .setIn(['approveUser', 'error'], null)
        .setIn(['approveUser', 'data'], {});
    case APPROVE_USER_SUCCESS:
      return state
        .setIn(['approveUser', 'loading'], false)
        .setIn(['approveUser', 'status'], 'success')
        .setIn(['approveUser', 'error'], null)
        .setIn(['approveUser', 'data'], {});
    case APPROVE_USER_FAILURE:
      return state
        .setIn(['approveUser', 'loading'], false)
        .setIn(['approveUser', 'status'], 'failure')
        .setIn(['approveUser', 'error'], action.payload)
        .setIn(['approveUser', 'data'], {});
    case REJECT_USER:
      return state
        .setIn(['rejectUser', 'loading'], true)
        .setIn(['rejectUser', 'status'], 'waiting')
        .setIn(['rejectUser', 'error'], null)
        .setIn(['rejectUser', 'data'], {});
    case REJECT_USER_SUCCESS:
      return state
        .setIn(['rejectUser', 'loading'], false)
        .setIn(['rejectUser', 'status'], 'success')
        .setIn(['rejectUser', 'error'], null)
        .setIn(['rejectUser', 'data'], {});
    case REJECT_USER_FAILURE:
      return state
        .setIn(['rejectUser', 'loading'], false)
        .setIn(['rejectUser', 'status'], 'failure')
        .setIn(['rejectUser', 'error'], action.payload)
        .setIn(['rejectUser', 'data'], {});
    case PROMOTE_USER:
      return state
        .setIn(['promoteUser', 'loading'], true)
        .setIn(['promoteUser', 'status'], 'waiting')
        .setIn(['promoteUser', 'error'], null)
        .setIn(['promoteUser', 'data'], {});
    case PROMOTE_USER_SUCCESS:
      return state
        .setIn(['promoteUser', 'loading'], false)
        .setIn(['promoteUser', 'status'], 'success')
        .setIn(['promoteUser', 'error'], null)
        .setIn(['promoteUser', 'data'], {});
    case PROMOTE_USER_FAILURE:
      return state
        .setIn(['promoteUser', 'loading'], false)
        .setIn(['promoteUser', 'status'], 'failure')
        .setIn(['promoteUser', 'error'], action.payload)
        .setIn(['promoteUser', 'data'], {});
    case UPDATE_LOGGED_USER_INFO:
      if (action.payload.profile) {
        return state
          .setIn(['loggedUser', 'isAuthenticated'], action.payload.isAuthenticated)
          .setIn(['loggedUser', 'profile'], action.payload.profile);
      }
      return state
        .setIn(['loggedUser', 'isAuthenticated'], action.payload.isAuthenticated);
    case UPDATE_LOGGED_USER_DATA:
      return state
        .setIn(['loggedUser', 'data'], action.payload);
    default:
      return state;
  }
};

export default usersReducer;
