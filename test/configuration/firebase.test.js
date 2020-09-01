import { initializeFirebase } from '../../src/configuration/firebase';
import env from '../env.json';

test('Test Function: initializeFirebase', () => {
  expect(initializeFirebase(env)).toBeTruthy();
});
