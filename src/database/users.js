import { usersCollection } from './collections';
import { fireStore } from '../configuration/firebase';
import { USER_ROLES } from './constants';

export const getPaginatedUsers = async ({
  orderBy,
  startAt,
  limit,
  query,
}) => {
  if (startAt === undefined || startAt === null) {
    throw new Error('No skip defined');
  }
  if (!limit) throw new Error('No limit defined');

  let queries = usersCollection();
  if (query && query.length > 0) {
    queries = query.reduce((total, queryItem) => total
      .where(queryItem[0], queryItem[1], queryItem[2]),
    usersCollection());
  }

  const users = await queries
    .where('profileCompletion', '==', 'complete')
    .orderBy(orderBy)
    .startAt(startAt)
    .limit(limit)
    .get();

  return users.docs.map((user) => ({
    id: user.id,
    ...user.data(),
  }));
};

export const getUserInfo = async (payload) => {
  const user = await usersCollection()
    .doc(payload)
    .get();
  if (user.exists) {
    let musics = [];

    const musicsRef = await usersCollection()
      .doc(payload)
      .collection('musics')
      .get();

    if (musicsRef.docs && musicsRef.docs.length > 0) {
      musics = musicsRef.docs.map((music) => ({
        id: music.id,
        ...music.data(),
      }));
    }

    return { id: user.id, ...user.data(), musics };
  }
  return false;
};

export const approveUser = async (payload) => {
  if (!payload) throw new Error('No userId defined');

  const userRef = usersCollection().doc(payload);
  await fireStore.runTransaction(async (transaction) => {
    const userGet = await transaction.get(userRef);

    if (userGet.exists) {
      await transaction.update(userRef, { status: 'approved' });
    }
  });
  return true;
};

export const rejectUser = async (payload) => {
  if (!payload) throw new Error('No userId defined');

  const userRef = usersCollection().doc(payload);
  await fireStore.runTransaction(async (transaction) => {
    const userGet = await transaction.get(userRef);

    if (userGet.exists) {
      await transaction.update(userRef, { status: 'rejected' });
    }
  });
  return true;
};

export const promoteUser = async ({ userId, role }) => {
  if (!role) throw new Error('No role defined');
  if (!userId) throw new Error('No userId defined');
  if (!Object.values(USER_ROLES).includes(role)) throw new Error('Invalid role');

  const userRef = usersCollection().doc(userId);
  await fireStore.runTransaction(async (transaction) => {
    const userGet = await transaction.get(userRef);

    if (userGet.exists) {
      await transaction.update(userRef, { role });
    }
  });
  return true;
};
