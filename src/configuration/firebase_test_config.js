import { initializeTestApp, apps, firestore } from '@firebase/testing';
import { setFirebaseVariables } from './firebase';
import { createTestMocks } from './firebase_mocks';

export const initializeFirebaseTestEnvironment = async () => {
  const appTest = await initializeTestApp({
    projectId: 'tribhus',
    auth: { uid: 'alice', email: 'alice@example.com' },
  });

  const firestoreTest = appTest.firestore();
  const fireStorageTest = appTest.storage();

  setFirebaseVariables({
    store: firestoreTest,
    storage: fireStorageTest,
    FieldValue: firestore.FieldValue,
  });

  await createTestMocks();
  return true;
};

export const finalizeFirebaseTestEnvironment = async () => {
  await Promise.all(apps().map((app) => app.delete()));
};
