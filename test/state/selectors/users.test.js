import { fromJS } from 'immutable';
import {
  selectApproveUser,
  selectPaginatedUsers,
  selectPromoteUser, selectUserInfo,
} from '../../../src/state/selectors/users';

test('Test Selector: selectApproveUser', () => {
  const state = {
    users: fromJS({
      approveUser: { label: 'value', value: 'value' },
    }),
  };
  const result = { label: 'value', value: 'value' };

  expect(selectApproveUser(state)).toEqual(result);
});

test('Test Selector: selectPaginatedUsers', () => {
  const state = {
    users: fromJS({
      paginatedUsers: { label: 'value', value: 'value' },
    }),
  };
  const result = { label: 'value', value: 'value' };

  expect(selectPaginatedUsers(state)).toEqual(result);
});

test('Test Selector: selectPromoteUser', () => {
  const state = {
    users: fromJS({
      promoteUser: { label: 'value', value: 'value' },
    }),
  };
  const result = { label: 'value', value: 'value' };

  expect(selectPromoteUser(state)).toEqual(result);
});

test('Test Selector: selectUserInfo', () => {
  const state = {
    users: fromJS({
      userInfo: { label: 'value', value: 'value' },
    }),
  };
  const result = { label: 'value', value: 'value' };

  expect(selectUserInfo(state)).toEqual(result);
});
