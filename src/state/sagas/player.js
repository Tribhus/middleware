import {
  spawn, takeEvery, put, apply, select,
} from 'redux-saga/effects';
// eslint-disable-next-line import/no-unresolved
import { Audio } from 'expo-av';
import {
  LOAD_MUSIC_REQUEST,
  PLAY_MUSIC_REQUEST,
  PAUSE_MUSIC_REQUEST,
  CHANGE_MUSIC_REQUEST,
  STOP_MUSIC_REQUEST,
} from '../constants/player';
import {
  makeLoadMusicRequest,
  makeLoadMusicFailure,
  makeLoadMusicSuccess,
  makePlayMusicSuccess,
  makePlayMusicFailure,
  makePauseMusicSuccess,
  makePauseMusicFailure,
  makeChangeMusicNext,
  makeChangeMusicPrev,
  makeSetCurrentLoadingIndex,
  makeStopMusicSuccess,
  makeStopMusicFailure,
  makeSetMusicDuration,
  makeSetMusicPosition,
} from '../actions/player';
import {
  selectPlaylist,
  selectCurrentMusicIndex,
  selectIsLoading,
  selectIsMusicPlaying,
} from '../selectors/player';
import store from '../store'; // eslint-disable-line import/no-cycle

let playbackInstance = null;
const onPlaybackStatusUpdate = (status) => {
  store.dispatch(makeSetMusicPosition(status.positionMillis));
};
const initPlayback = () => {
  playbackInstance = new Audio.Sound();
  playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
};

export function* loadWatcher() {
  try {
    yield apply(Audio, 'setAudioModeAsync', [
      {
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: false,
      },
    ]);
    initPlayback();
  } catch (e) {
    console.log('Se preocupe com isso depois: ', e.message); // eslint-disable-line no-console
  }
}

export function* loadMusicWatcher() {
  try {
    const playlist = yield select(selectPlaylist);
    const index = yield select(selectCurrentMusicIndex);
    const isPlaying = yield select(selectIsMusicPlaying);
    yield put(makeSetCurrentLoadingIndex(index));
    if (!playbackInstance) {
      initPlayback();
    }
    if (playbackInstance) {
      yield apply(playbackInstance, 'unloadAsync');
    }
    yield apply(playbackInstance, 'loadAsync', [
      {
        uri:
          (typeof playlist.get === 'function' && playlist.get(index).get('uri'))
          || playlist[index].uri,
      },
      { shouldPlay: isPlaying },
    ]);
    const actualCurrentIndex = yield select(selectCurrentMusicIndex);
    if (index === actualCurrentIndex) {
      const playbackStatus = yield playbackInstance.getStatusAsync();
      yield put(makeSetMusicDuration(playbackStatus.durationMillis));
      yield put(makeLoadMusicSuccess());
    } else {
      yield apply(playbackInstance, 'unloadAsync');
      yield put(makeLoadMusicRequest());
    }
  } catch (error) {
    yield put(makeLoadMusicFailure(error));
  }
}

export function* playMusicWatcher() {
  try {
    const playbackStatus = yield playbackInstance.getStatusAsync();
    if (!playbackStatus.isLoaded) {
      yield put(makeLoadMusicRequest());
    }
    yield apply(playbackInstance, 'playAsync');
    yield put(makePlayMusicSuccess());
  } catch (error) {
    yield put(makePlayMusicFailure(error));
  }
}

export function* pauseMusicWatcher() {
  try {
    yield apply(playbackInstance, 'pauseAsync');
    yield put(makePauseMusicSuccess());
  } catch (error) {
    yield put(makePauseMusicFailure(error));
  }
}

export function* changeMusicWatcher(action) {
  try {
    const isLoading = yield select(selectIsLoading);

    if (action.payload.isForward) {
      yield put(makeChangeMusicNext());
    } else {
      yield put(makeChangeMusicPrev());
    }
    if (!isLoading) {
      yield apply(playbackInstance, 'unloadAsync');
      yield put(makeLoadMusicRequest());
    }
  } catch (error) {
    yield put(makeLoadMusicFailure());
  }
}

export function* stopMusicWatcher() {
  try {
    yield apply(playbackInstance, 'stopAsync');
    yield put(makeStopMusicSuccess());
  } catch (error) {
    yield put(makeStopMusicFailure(error));
  }
}

export default function* playerSaga() {
  yield spawn(loadWatcher);
  yield takeEvery(LOAD_MUSIC_REQUEST, loadMusicWatcher);
  yield takeEvery(PLAY_MUSIC_REQUEST, playMusicWatcher);
  yield takeEvery(PAUSE_MUSIC_REQUEST, pauseMusicWatcher);
  yield takeEvery(CHANGE_MUSIC_REQUEST, changeMusicWatcher);
  yield takeEvery(STOP_MUSIC_REQUEST, stopMusicWatcher);
}
