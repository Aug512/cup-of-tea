import { IThemeData } from 'types/common';

export enum ThemesActionType {
    ThemesListSucces = 'THEMES_LIST_SUCCESS',
    ThemeRequestSuccess = 'THEME_REQUEST_SUCCESS',
}

interface IThemesListSuccessActionCreator {
    type: ThemesActionType.ThemesListSucces;
    payload: { list:  IThemeData[] };
}

interface IThemeRequestSuccessActionCreator {
    type: ThemesActionType.ThemeRequestSuccess;
    payload: { theme:  IThemeData };
}

export type ThemesActionCreatorType =
    IThemesListSuccessActionCreator |
    IThemeRequestSuccessActionCreator;
