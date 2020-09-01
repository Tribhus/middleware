/* eslint-disable import/no-mutable-exports */

import {
  auth, functions, storage, firestore, initializeApp,
} from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/firestore';

export let fireAuth;
export let fireStore;
export let fireStorage;
export let fireFunctions;

export let FbProvider;
export let GlugluProvider;
export let persistenceProvider;
export let EmailAuthProvider;

export let FieldValue;

export const setFirebaseVariables = (config) => {
  if (config.auth) fireAuth = config.auth;
  if (config.store) fireStore = config.store;
  if (config.storage) fireStorage = config.storage;
  if (config.functions) fireFunctions = config.functions;

  if (config.FieldValue) FieldValue = config.FieldValue;
};

export const initializeFirebase = (firebaseConfig) => {
  try {
    initializeApp(firebaseConfig);

    const firebaseVariables = {
      auth: auth(),
      store: firestore(),
      storage: storage(),
      functions: functions(),
      FieldValue: firestore.FieldValue,
    };

    setFirebaseVariables(firebaseVariables);

    FbProvider = auth.FacebookAuthProvider;
    GlugluProvider = auth.GoogleAuthProvider;
    persistenceProvider = auth.Auth.Persistence;
    EmailAuthProvider = auth.EmailAuthProvider;

    return true;
  } catch (e) {
    return false;
  }
};
