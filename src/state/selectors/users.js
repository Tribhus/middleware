import { createSelector } from 'reselect';

export const usersModuleSelector = (state) => state.users;

export const selectApproveUser = createSelector(
  usersModuleSelector,
  (subState) => subState.get('approveUser').toJS(),
);

export const selectPromoteUser = createSelector(
  usersModuleSelector,
  (subState) => subState.get('promoteUser').toJS(),
);

export const selectPaginatedUsers = createSelector(
  usersModuleSelector,
  (subState) => subState.get('paginatedUsers').toJS(),
);

export const selectUserInfo = createSelector(
  usersModuleSelector,
  (subState) => subState.get('userInfo').toJS(),
);

export const selectLoggedUser = createSelector(
  usersModuleSelector,
  (subState) => subState.get('loggedUser').toJS(),
);
