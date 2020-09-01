import {
  LOAD_MUSIC_REQUEST,
  LOAD_MUSIC_SUCCESS,
  LOAD_MUSIC_FAILURE,
  PLAY_MUSIC_REQUEST,
  PAUSE_MUSIC_REQUEST,
  PAUSE_MUSIC_SUCCESS,
  PAUSE_MUSIC_FAILURE,
  PLAY_MUSIC_SUCCESS,
  PLAY_MUSIC_FAILURE,
  CHANGE_MUSIC_REQUEST,
  NEXT_MUSIC_REQUEST,
  PREV_MUSIC_REQUEST,
  SET_CURRENT_INDEX,
  STOP_MUSIC_REQUEST,
  STOP_MUSIC_SUCCESS,
  STOP_MUSIC_FAILURE,
  SET_MUSIC_DURATION,
  SET_MUSIC_POSITION,
  CHANGE_PLAYLIST,
  CHANGE_SAVED_PARAM,
} from '../constants/player';

export const makeLoadMusicRequest = () => ({
  type: LOAD_MUSIC_REQUEST,
});

export const makeLoadMusicSuccess = () => ({
  type: LOAD_MUSIC_SUCCESS,
});

export const makeLoadMusicFailure = (error) => ({
  type: LOAD_MUSIC_FAILURE,
  payload: error,
});

export const makePlayMusicRequest = () => ({
  type: PLAY_MUSIC_REQUEST,
});

export const makePlayMusicSuccess = () => ({
  type: PLAY_MUSIC_SUCCESS,
});

export const makePlayMusicFailure = (error) => ({
  type: PLAY_MUSIC_FAILURE,
  payload: error,
});

export const makePauseMusicRequest = () => ({
  type: PAUSE_MUSIC_REQUEST,
});

export const makePauseMusicSuccess = () => ({
  type: PAUSE_MUSIC_SUCCESS,
});

export const makePauseMusicFailure = (error) => ({
  type: PAUSE_MUSIC_FAILURE,
  payload: error,
});

export const makeChangeMusicRequest = (isForward) => ({
  type: CHANGE_MUSIC_REQUEST,
  payload: { isForward },
});

export const makeChangeMusicNext = () => ({
  type: NEXT_MUSIC_REQUEST,
});
export const makeChangeMusicPrev = () => ({
  type: PREV_MUSIC_REQUEST,
});

export const makeSetCurrentLoadingIndex = (index) => ({
  type: SET_CURRENT_INDEX,
  payload: { index },
});

export const makeStopMusicRequest = () => ({
  type: STOP_MUSIC_REQUEST,
});

export const makeStopMusicSuccess = () => ({
  type: STOP_MUSIC_SUCCESS,
});

export const makeStopMusicFailure = (error) => ({
  type: STOP_MUSIC_FAILURE,
  payload: error,
});

export const makeSetMusicDuration = (duration) => ({
  type: SET_MUSIC_DURATION,
  payload: { duration },
});

export const makeSetMusicPosition = (position) => ({
  type: SET_MUSIC_POSITION,
  payload: { position },
});

/* Change Playlist */

export const makeChangePlaylist = (playlist) => ({
  type: CHANGE_PLAYLIST,
  payload: { playlist },
});

/* Save new params received from player page */
export const makeChangeParams = (savedParams) => ({
  type: CHANGE_SAVED_PARAM,
  payload: { savedParams },
});
