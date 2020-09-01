import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO,
  APPROVE_USER,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAILURE,
  PROMOTE_USER,
  PROMOTE_USER_SUCCESS,
  PROMOTE_USER_FAILURE,
  GET_PAGINATED_USERS,
  GET_PAGINATED_USERS_SUCCESS,
  GET_PAGINATED_USERS_FAILURE,
  GET_USER_INFO_FAILURE,
  UPDATE_LOGGED_USER_INFO,
  UPDATE_LOGGED_USER_DATA,
  REJECT_USER_SUCCESS,
  REJECT_USER_FAILURE,
  REJECT_USER,
} from '../constants/users';

/* GET ALL BANDS */

export const getPaginatedUsersRequest = (payload) => ({
  type: GET_PAGINATED_USERS,
  payload,
});

export const getPaginatedUsersSuccess = (payload) => ({
  type: GET_PAGINATED_USERS_SUCCESS,
  payload,
});

export const getPaginatedUsersFailure = (payload) => ({
  type: GET_PAGINATED_USERS_FAILURE,
  payload,
});

/* GET USER INFO */

export const getUserInfoRequest = (payload) => ({
  type: GET_USER_INFO,
  payload,
});

export const getUserInfoSuccess = (payload) => ({
  type: GET_USER_INFO_SUCCESS,
  payload,
});

export const getUserInfoFailure = (payload) => ({
  type: GET_USER_INFO_FAILURE,
  payload,
});

/* APPROVE USER */

export const approveUserRequest = (payload) => ({
  type: APPROVE_USER,
  payload,
});

export const approveUserSuccess = (payload) => ({
  type: APPROVE_USER_SUCCESS,
  payload,
});

export const approveUserFailure = (payload) => ({
  type: APPROVE_USER_FAILURE,
  payload,
});

/* REJECT USER */

export const rejectUserRequest = (payload) => ({
  type: REJECT_USER,
  payload,
});

export const rejectUserSuccess = (payload) => ({
  type: REJECT_USER_SUCCESS,
  payload,
});

export const rejectUserFailure = (payload) => ({
  type: REJECT_USER_FAILURE,
  payload,
});

/* PROMOTE USER */

export const promoteUserRequest = (payload) => ({
  type: PROMOTE_USER,
  payload,
});

export const promoteUserSuccess = (payload) => ({
  type: PROMOTE_USER_SUCCESS,
  payload,
});

export const promoteUserFailure = (payload) => ({
  type: PROMOTE_USER_FAILURE,
  payload,
});

/* UPDATE USER INFO */

export const updateLoggedUserInfo = (payload) => ({
  type: UPDATE_LOGGED_USER_INFO,
  payload,
});

export const updateLoggedUserData = (payload) => ({
  type: UPDATE_LOGGED_USER_DATA,
  payload,
});
