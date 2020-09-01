import { createSelector } from 'reselect';

export const selectPlayerModule = (state) => state.player;

export const selectIsMusicPlaying = createSelector(selectPlayerModule, (subState) => subState.get('isPlaying'));

export const selectLoadingPlaying = createSelector(selectPlayerModule, (subState) => subState.get('isPlayingLoading'));

export const selectIsLoading = createSelector(selectPlayerModule, (subState) => subState.get('isLoading'));

export const selectPlaylist = createSelector(selectPlayerModule, (subState) => subState.get('playlist'));

export const selectCurrentMusicIndex = createSelector(selectPlayerModule, (subState) => subState.get('currentIndex'));

export const selectCurentLoadingIndex = createSelector(selectPlayerModule, (subState) => subState.get('currentLoadingIndex'));

export const selectPositionMusic = createSelector(selectPlayerModule, (subState) => subState.get('position'));

export const selectDurationMusic = createSelector(selectPlayerModule, (subState) => subState.get('duration'));

export const selectSavedParams = createSelector(selectPlayerModule, (subState) => subState.get('savedParams'));
