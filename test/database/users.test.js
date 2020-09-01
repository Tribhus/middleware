import {
  approveUser,
  getPaginatedUsers,
  getUserInfo,
  promoteUser,
} from '../../src/database/users';
import {
  finalizeFirebaseTestEnvironment,
  initializeFirebaseTestEnvironment,
} from '../../src/configuration/firebase_test_config';
import { USER_MOCKS } from '../../src/configuration/firebase_mocks';
import { USER_ROLES } from '../../src/database/constants';
import { usersCollection } from '../../src/database/collections';
import { FieldValue } from '../../src/configuration/firebase';

beforeAll(async (done) => {
  await initializeFirebaseTestEnvironment();
  done();
});

test('Test Function: getPaginatedUsers', async () => {
  const query = [
    ['category', '==', 'band'],
    ['createdAt', '>', '2020-08-10'],
  ];

  await expect(getPaginatedUsers({
    orderBy: 'createdAt',
    limit: 10,
    startAt: 1,
    query,
  })).resolves.toBeTruthy();
});

test('Test Function: getUserInfo', async () => {
  await expect(getUserInfo(USER_MOCKS.commonUser.id))
    .resolves
    .toEqual({
      ...USER_MOCKS.commonUser,
      musics: [],
    });

  await expect(getUserInfo('noUser'))
    .resolves
    .toBeFalsy();

  await expect(getUserInfo(USER_MOCKS.musicUser.id))
    .resolves
    .toEqual({
      ...USER_MOCKS.musicUser,
      musics: [
        { id: 'newMusic', name: 'music.mp3', userId: 'musicUser' },
      ],
    });
});

test('Test Function: approveUser', async () => {
  await expect(approveUser(USER_MOCKS.commonUser.id))
    .resolves
    .toBeTruthy();

  await expect(getUserInfo(USER_MOCKS.commonUser.id))
    .resolves
    .toEqual({
      ...USER_MOCKS.commonUser,
      musics: [],
      approved: true,
    });

  await usersCollection()
    .doc(USER_MOCKS.commonUser.id)
    .update({ approved: FieldValue.delete() });
});

test('Test Function: promoteUser', async () => {
  await expect(promoteUser({
    userId: USER_MOCKS.commonUser.id,
    role: USER_ROLES.superAdmin,
  }))
    .resolves
    .toBeTruthy();

  await expect(getUserInfo(USER_MOCKS.commonUser.id))
    .resolves
    .toEqual({
      ...USER_MOCKS.commonUser,
      musics: [],
      role: USER_ROLES.superAdmin,
    });

  await usersCollection()
    .doc(USER_MOCKS.commonUser.id)
    .update({ role: FieldValue.delete() });
});

afterAll(async (done) => {
  await finalizeFirebaseTestEnvironment();
  done();
});
