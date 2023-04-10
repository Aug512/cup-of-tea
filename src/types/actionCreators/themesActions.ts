import { IFirebaseError, IThemeData } from 'types/common';

export enum ThemesActionType {
    ThemesListSucces = 'THEMES_LIST_SUCCESS',
    ThemesListError = 'THEMES_LIST_ERROR',

    ThemeRequestSuccess = 'THEME_REQUEST_SUCCESS',
    ThemeRequestError = 'THEME_REQUEST_ERROR',

    ThemeEditSuccess = 'THEME_EDIT_SUCCESS',
    ThemeEditError = 'THEME_EDIT_ERROR',
}

interface IThemesListSuccessActionCreator {
    type: ThemesActionType.ThemesListSucces;
    payload: { list:  IThemeData[] };
}

interface IThemesListErrorActionCreator {
    type: ThemesActionType.ThemesListError;
    payload: { error: IFirebaseError };
}

interface IThemeRequestSuccessActionCreator {
    type: ThemesActionType.ThemeRequestSuccess;
    payload: { theme:  IThemeData };
}

interface IThemeRequestErrorActionCreator {
    type: ThemesActionType.ThemeRequestError;
    payload: { error: IFirebaseError };
}

export type ThemesActionCreatorType =
    IThemesListSuccessActionCreator |
    IThemesListErrorActionCreator |
    IThemeRequestSuccessActionCreator |
    IThemeRequestErrorActionCreator;
