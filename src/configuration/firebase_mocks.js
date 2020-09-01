import { usersCollection } from '../database/collections';
import { fireStore } from './firebase';

export const USER_MOCKS = {
  commonUser: {
    id: 'commonUser',
    name: 'user',
    createdAt: '2020-08-12',
    category: 'band',
    profileCompletion: 'complete',
  },
  musicUser: { id: 'musicUser', name: 'user', createdAt: '2020-08-10' },
};

export const MUSIC_MOCKS = {
  commonMusic: { id: 'newMusic', name: 'music.mp3', userId: 'musicUser' },
};

export const createTestMocks = async () => {
  const batch = fireStore.batch();

  Object.values(USER_MOCKS).forEach((user) => {
    batch.set(usersCollection().doc(user.id), { ...user });
  });

  Object.values(MUSIC_MOCKS).forEach((music) => {
    batch.set(
      usersCollection()
        .doc(music.userId)
        .collection('musics')
        .doc(music.id),
      { ...music },
    );
  });

  await batch.commit();
};
