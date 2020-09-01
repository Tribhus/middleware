import { fromJS } from 'immutable';
import fromGenerator from 'redux-saga-test';
import assert from 'assert';
import {
  selectPlaylist,
  selectCurrentMusicIndex,
  selectIsMusicPlaying,
  selectIsLoading,
} from '../../../src/state/selectors/player';
import {
  // loadWatcher,
  loadMusicWatcher,
  playMusicWatcher,
  pauseMusicWatcher,
  stopMusicWatcher,
  changeMusicWatcher,
} from '../../../src/state/sagas/player';
import {
  SET_CURRENT_INDEX,
  LOAD_MUSIC_SUCCESS,
  PLAY_MUSIC_SUCCESS,
  PAUSE_MUSIC_SUCCESS,
  STOP_MUSIC_SUCCESS,
  NEXT_MUSIC_REQUEST,
  LOAD_MUSIC_REQUEST,
  PREV_MUSIC_REQUEST,
} from '../../../src/state/constants/player';
import { makeChangeMusicRequest } from '../../../src/state/actions/player';

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

describe('PLAYER SAGA EXECUTION', () => {
  // test.skip('>>> Setup', () => {
  //   const generator = loadWatcher();
  //   const generatorExpect = fromGenerator(assert, generator);
  //   generator.next();
  // });

  test('>>> Load', () => {
    const generator = loadMusicWatcher();
    const generatorExpect = fromGenerator(assert, generator);

    generatorExpect.next().select(selectPlaylist);
    generatorExpect.next(initialState.get('playlist')).select(selectCurrentMusicIndex);
    generatorExpect.next(0).select(selectIsMusicPlaying);
    generatorExpect.next().put({ type: SET_CURRENT_INDEX, payload: { index: 0 } });

    const loadCall = generator.next().value;
    expect(loadCall.type).toEqual('CALL');
    expect(loadCall.payload.context.constructor.name).toEqual('Sound');

    generatorExpect.next().select(selectCurrentMusicIndex);
    generator.next(0);
    expect(generator.next({ durationMillis: 1 }).value.type).toEqual('PUT');
    generatorExpect.next().put({ type: LOAD_MUSIC_SUCCESS });
    expect(generator.next()).toBeTruthy();
  });

  test('>>> Play', () => {
    const generator = playMusicWatcher();
    const generatorExpect = fromGenerator(assert, generator);
    const playCall = generator.next().value;
    expect(playCall.type).toEqual('CALL');
    expect(playCall.payload.context.constructor.name).toEqual('Sound');
    generatorExpect.next().put({ type: PLAY_MUSIC_SUCCESS });
  });

  test('>>> Pause', () => {
    const generator = pauseMusicWatcher();
    const generatorExpect = fromGenerator(assert, generator);
    const playCall = generator.next().value;
    expect(playCall.type).toEqual('CALL');
    expect(playCall.payload.context.constructor.name).toEqual('Sound');
    generatorExpect.next().put({ type: PAUSE_MUSIC_SUCCESS });
  });

  test('>>> Stop', () => {
    const generator = stopMusicWatcher();
    const generatorExpect = fromGenerator(assert, generator);
    const playCall = generator.next().value;
    expect(playCall.type).toEqual('CALL');
    expect(playCall.payload.context.constructor.name).toEqual('Sound');
    generatorExpect.next().put({ type: STOP_MUSIC_SUCCESS });
  });
  describe('CHANGE MUSIC', () => {
    test('>>> Change Forward', () => {
      const generator = changeMusicWatcher(makeChangeMusicRequest(true));
      const generatorExpect = fromGenerator(assert, generator);
      generatorExpect.next().select(selectIsLoading);
      generatorExpect.next().put({ type: NEXT_MUSIC_REQUEST });
      const unloadCall = generator.next().value;
      expect(unloadCall.type).toEqual('CALL');
      expect(unloadCall.payload.context.constructor.name).toEqual('Sound');
      generatorExpect.next().put({ type: LOAD_MUSIC_REQUEST });
    });
    test('>>> Change Backward', () => {
      const generator = changeMusicWatcher(makeChangeMusicRequest(false));
      const generatorExpect = fromGenerator(assert, generator);
      generatorExpect.next().select(selectIsLoading);
      generatorExpect.next().put({ type: PREV_MUSIC_REQUEST });
      const unloadCall = generator.next().value;
      expect(unloadCall.type).toEqual('CALL');
      expect(unloadCall.payload.context.constructor.name).toEqual('Sound');
      generatorExpect.next().put({ type: LOAD_MUSIC_REQUEST });
    });
  });
});
