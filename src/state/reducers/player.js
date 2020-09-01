import { fromJS } from 'immutable';
import {
  LOAD_MUSIC_REQUEST,
  LOAD_MUSIC_FAILURE,
  LOAD_MUSIC_SUCCESS,
  PLAY_MUSIC_SUCCESS,
  PLAY_MUSIC_FAILURE,
  PLAY_MUSIC_REQUEST,
  PAUSE_MUSIC_REQUEST,
  PAUSE_MUSIC_SUCCESS,
  PAUSE_MUSIC_FAILURE,
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

const initialState = fromJS({
  isLoading: true,
  isPlaying: false,
  isPlayingLoading: false,
  playlist: [
    {
      title: 'Punky',
      author: 'Benjamim Tissot',
      source: 'Bensound',
      uri: 'https://www.bensound.com/bensound-music/bensound-punky.mp3',
      imageSrc: 'https://www.bensound.com/bensound-img/punky.jpg',
    },
    {
      title: 'Happy Rock',
      author: 'Benjamim Tissot',
      source: 'Bensound',
      uri: 'https://www.bensound.com/bensound-music/bensound-happyrock.mp3',
      imageSrc: 'https://www.bensound.com/bensound-img/happyrock.jpg',
    },
    {
      title: 'Rumble',
      author: 'Benjamim Tissot',
      source: 'Bensound',
      uri: 'https://www.bensound.com/bensound-music/bensound-rumble.mp3',
      imageSrc: 'https://www.bensound.com/bensound-img/rumble.jpg',
    },
    {
      title: 'High Octane',
      author: 'Benjamim Tissot',
      source: 'Bensound',
      uri: 'https://www.bensound.com/bensound-music/bensound-highoctane.mp3',
      imageSrc: 'https://www.bensound.com/bensound-img/highoctane.jpg',
    },
  ],
  currentIndex: 0,
  currentLoadingIndex: 0,
  duration: 0,
  position: 0,
  savedParams: {},
});

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MUSIC_REQUEST:
      return state.set('isPlayingLoading', true);
    case PLAY_MUSIC_SUCCESS:
      return state.set('isPlaying', true).set('isPlayingLoading', false);
    case PLAY_MUSIC_FAILURE:
      console.warn('Play fail', action.payload.message); // eslint-disable-line no-console
      return state.set('isPlaying', false).set('isPlayingLoading', false);
    case PAUSE_MUSIC_REQUEST:
      return state.set('isPlayingLoading', true);
    case PAUSE_MUSIC_SUCCESS:
      return state.set('isPlaying', false).set('isPlayingLoading', false);
    case PAUSE_MUSIC_FAILURE:
      console.warn('Pause fail', action.payload.message); // eslint-disable-line no-console
      return state.set('isPlaying', true).set('isPlayingLoading', false);
    case LOAD_MUSIC_REQUEST:
      return state.set('isLoading', true);
    case LOAD_MUSIC_SUCCESS:
      return state.set('isLoading', false);
    case LOAD_MUSIC_FAILURE:
      console.warn('Load fail', action.payload.message); // eslint-disable-line no-console
      return state.set('isLoading', false);
    case NEXT_MUSIC_REQUEST:
      if (
        (typeof state.get('playlist').get === 'function'
          && !state.get('playlist').get(state.get('currentIndex') + 1))
        || (state.get('playlist') && !state.get('playlist')[state.get('currentIndex') + 1])
      ) {
        return state.set('currentIndex', 0).set('isLoading', true);
      }
      return state.set('currentIndex', state.get('currentIndex') + 1).set('isLoading', true);
    case PREV_MUSIC_REQUEST:
      if (!(state.get('currentIndex') > 0)) {
        return state.set('currentIndex', 0).set('isLoading', true);
      }
      if (
        (typeof state.get('playlist').get === 'function'
          && !state.get('playlist').get(state.get('currentIndex') - 1))
        || (state.get('playlist') && !state.get('playlist')[state.get('currentIndex') - 1])
      ) {
        return state.set('currentIndex', state.get('playlist').size - 1).set('isLoading', true);
      }
      return state.set('currentIndex', state.get('currentIndex') - 1).set('isLoading', true);
    case SET_CURRENT_INDEX:
      return state.set('currentLoadingIndex', action.payload.index);
    case STOP_MUSIC_REQUEST:
      return state.set('isLoading', true);
    case STOP_MUSIC_SUCCESS:
      return state.set('isPlaying', false).set('isLoading', false);
    case STOP_MUSIC_FAILURE:
      console.warn('Stop fail', action.payload.message); // eslint-disable-line no-console
      return state.set('isLoading', false);
    case SET_MUSIC_DURATION:
      return state.set('duration', action.payload.duration);
    case SET_MUSIC_POSITION:
      return state.set('position', action.payload.position);
    case CHANGE_PLAYLIST:
      return state.set('playlist', action.payload.playlist);
    case CHANGE_SAVED_PARAM:
      return state.set('savedParams', action.payload.savedParams);
    default:
      return state;
  }
};

export default playerReducer;
