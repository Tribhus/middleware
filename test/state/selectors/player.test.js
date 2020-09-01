import { fromJS } from 'immutable';
import { select } from 'redux-saga/effects';
import {
  selectPlaylist,
  selectCurrentMusicIndex,
  selectIsMusicPlaying,
  selectCurentLoadingIndex,
  selectIsLoading,
  selectLoadingPlaying,
  selectPositionMusic,
  selectDurationMusic,
} from '../../../src/state/selectors/player';
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
});
describe('PLAYER SELECTORS RESULTS', () => {
  test('>>> GET isPlaying', () => {
    expect(select(selectIsMusicPlaying).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('isPlaying')
    );
  });
  test('>>> GET isPlayingLoading', () => {
    expect(select(selectLoadingPlaying).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('isPlayingLoading')
    );
  });
  test('>>> GET isLoading', () => {
    expect(select(selectIsLoading).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('isLoading')
    );
  });
  test('>>> GET playlist', () => {
    expect(select(selectPlaylist).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('playlist')
    );
  });
  test('>>> GET currentIndex', () => {
    expect(select(selectCurrentMusicIndex).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('currentIndex')
    );
  });
  test('>>> GET currentLoadingIndex', () => {
    expect(select(selectCurentLoadingIndex).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('currentLoadingIndex')
    );
  });
  test('>>> GET position', () => {
    expect(select(selectPositionMusic).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('position')
    );
  });
  test('>>> GET duration', () => {
    expect(select(selectDurationMusic).payload.selector.resultFunc(initialState)).toEqual(
      initialState.get('duration')
    );
  });
});
