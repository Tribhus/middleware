import { fromJS } from 'immutable';
import {
  makeLoadMusicRequest,
  makeLoadMusicSuccess,
  makeLoadMusicFailure,
  makePlayMusicRequest,
  makePlayMusicSuccess,
  makePlayMusicFailure,
  makePauseMusicRequest,
  makePauseMusicSuccess,
  makePauseMusicFailure,
  makeStopMusicRequest,
  makeStopMusicSuccess,
  makeStopMusicFailure,
  makeChangeMusicNext,
  makeChangeMusicPrev,
} from '../../../src/state/actions/player';
import playerReducer from '../../../src/state/reducers/player';

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

describe('PLAYER REDUCERS EXECUTION', () => {
  describe('> Player reducers', () => {
    test('>>> Are working', () => {
      expect(playerReducer(initialState, '')).toEqual(initialState);
    });
    describe('>> Load Player', () => {
      test('>>> REQUEST', () => {
        expect(playerReducer(initialState, makeLoadMusicRequest()).get('isLoading')).toStrictEqual(
          initialState.set('isLoading', true).get('isLoading')
        );
      });
      test('>>> SUCCESS', () => {
        expect(playerReducer(initialState, makeLoadMusicSuccess()).get('isLoading')).toStrictEqual(
          initialState.set('isLoading', false).get('isLoading')
        );
      });
      test('>>> FAILURE', () => {
        expect(
          playerReducer(
            initialState,
            makeLoadMusicFailure({ message: 'Task failed successfully.' })
          ).get('isLoading')
        ).toStrictEqual(initialState.set('isLoading', false).get('isLoading'));
      });
    });
    describe('>> Play Player', () => {
      test('>>> REQUEST', () => {
        expect(
          playerReducer(initialState, makePlayMusicRequest()).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', true).get('isPlayingLoading'));
      });
      test('>>> SUCCESS', () => {
        expect(playerReducer(initialState, makePlayMusicSuccess()).get('isPlaying')).toStrictEqual(
          initialState.set('isPlaying', true).get('isPlaying')
        );
        expect(
          playerReducer(initialState, makePlayMusicSuccess()).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', false).get('isPlayingLoading'));
      });
      test('>>> FAILUE', () => {
        expect(
          playerReducer(
            initialState,
            makePlayMusicFailure({ message: 'Task failed successfully.' })
          ).get('isPlaying')
        ).toStrictEqual(initialState.set('isPlaying', false).get('isPlaying'));
        expect(
          playerReducer(
            initialState,
            makePlayMusicFailure({ message: 'Task failed successfully.' })
          ).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', false).get('isPlayingLoading'));
      });
    });
    describe('>> Pause Player', () => {
      test('>>> REQUEST', () => {
        expect(
          playerReducer(initialState, makePauseMusicRequest()).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', true).get('isPlayingLoading'));
      });
      test('>>> SUCCESS', () => {
        expect(playerReducer(initialState, makePauseMusicSuccess()).get('isPlaying')).toStrictEqual(
          initialState.set('isPlaying', false).get('isPlaying')
        );
        expect(
          playerReducer(initialState, makePauseMusicSuccess()).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', false).get('isPlayingLoading'));
      });
      test('>>> FAILUE', () => {
        expect(
          playerReducer(
            initialState,
            makePauseMusicFailure({ message: 'Task failed successfully.' })
          ).get('isPlaying')
        ).toStrictEqual(initialState.set('isPlaying', true).get('isPlaying'));
        expect(
          playerReducer(
            initialState,
            makePauseMusicFailure({ message: 'Task failed successfully.' })
          ).get('isPlayingLoading')
        ).toStrictEqual(initialState.set('isPlayingLoading', false).get('isPlayingLoading'));
      });
    });
    describe('>> Stop Player', () => {
      test('>>> REQUEST', () => {
        expect(playerReducer(initialState, makeStopMusicRequest()).get('isLoading')).toStrictEqual(
          initialState.set('isLoading', true).get('isLoading')
        );
      });
      test('>>> SUCCESS', () => {
        expect(playerReducer(initialState, makeStopMusicSuccess()).get('isPlaying')).toStrictEqual(
          initialState.set('isPlaying', false).get('isPlaying')
        );
        expect(playerReducer(initialState, makeStopMusicSuccess()).get('isLoading')).toStrictEqual(
          initialState.set('isLoading', false).get('isLoading')
        );
      });
      test('>>> FAILUE', () => {
        expect(
          playerReducer(
            initialState,
            makeStopMusicFailure({ message: 'Task failed successfully.' })
          ).get('isPlaying')
        ).toStrictEqual(initialState.set('isLoading', false).get('isLoading'));
      });
    });
    describe('>> Change Music', () => {
      test('>>> FORWARD', () => {
        expect(playerReducer(initialState, makeChangeMusicNext()).get('currentIndex')).toEqual(1);
      });
      test('>>> BACKWARD', () => {
        expect(
          playerReducer(initialState.set('currentIndex', 3), makeChangeMusicPrev()).get(
            'currentIndex'
          )
        ).toEqual(2);
      });
      test('>>> FORWARD to ZERO', () => {
        expect(
          playerReducer(initialState.set('currentIndex', 8001), makeChangeMusicNext()).get(
            'currentIndex'
          )
        ).toEqual(0);
      });
      test('>>> BACKWARD to ZERO', () => {
        expect(
          playerReducer(initialState.set('currentIndex', -8001), makeChangeMusicPrev()).get(
            'currentIndex'
          )
        ).toEqual(0);
      });
      test('>>> NEGATIVE FORWARD', () => {
        expect(
          playerReducer(initialState.set('currentIndex', -8001), makeChangeMusicNext()).get(
            'currentIndex'
          )
        ).toEqual(0);
      });
      test('>>> BACKWARD from INFINITY', () => {
        expect(
          playerReducer(initialState.set('currentIndex', 8001), makeChangeMusicPrev()).get(
            'currentIndex'
          )
        ).toEqual(initialState.get('playlist').size - 1);
      });
    });
  });
});
