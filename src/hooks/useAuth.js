import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fireAuth } from '../configuration/firebase';
import { updateLoggedUserData, updateLoggedUserInfo } from '../state/actions/users';
import { selectLoggedUser } from '../state/selectors/users';
import { usersCollection } from '../database/collections';

const useAuth = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const loggedUserUid = !!loggedUser && loggedUser.profile && loggedUser.profile.uid;

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(updateLoggedUserInfo({ isAuthenticated: false }));
      } else {
        dispatch(updateLoggedUserInfo({ isAuthenticated: true, profile: user }));
      }
    });
  }, [dispatch]);

  const userInfoWatcher = useCallback(() => {
    if (loggedUserUid) {
      return usersCollection()
        .doc(loggedUserUid)
        .onSnapshot((user) => {
          dispatch(updateLoggedUserData({ id: user.id, ...user.data() }));
        });
    }

    return () => {};
  }, [loggedUserUid, dispatch]);

  useEffect(() => {
    const unsub = userInfoWatcher();
    return () => unsub();
  }, [userInfoWatcher]);
};

export default useAuth;
