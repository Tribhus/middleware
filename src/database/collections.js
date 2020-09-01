/* eslint-disable import/prefer-default-export */

import { fireStore } from '../configuration/firebase';

const USERS_COLLECTION_NAME = 'users';

export const usersCollection = () => fireStore.collection(USERS_COLLECTION_NAME);
