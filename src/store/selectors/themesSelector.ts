import { RootState } from 'store';

export const themesSelector = (state: RootState) => state.themes;

export const themeSelector = (state: RootState) => state.theme;
