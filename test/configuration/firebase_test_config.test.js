import { initializeFirebaseTestEnvironment } from '../../src/configuration/firebase_test_config';

test('Test Function: initializeFirebaseTestEnvironment',
  () => expect(initializeFirebaseTestEnvironment()).resolves.toBeTruthy());
