import { ThemesActionType } from 'types/actionCreators/themesActions';
import { IFirebaseError, IThemeData } from 'types/common';

export const themesListSuccess = (list: IThemeData[]) => ({
    type: ThemesActionType.ThemesListSucces,
    payload: { list }
});

export const themesListError = (error: IFirebaseError) => ({
    type: ThemesActionType.ThemesListError,
    payload: { error }
});

export const themeRequestSuccess = (theme: IThemeData) => ({
    type: ThemesActionType.ThemeRequestSuccess,
    payload: { theme }
});

export const themeRequestError = (error: IFirebaseError) => ({
    type: ThemesActionType.ThemeRequestError,
    payload: { error }
});

export const themeEditSuccess = (theme: IThemeData) => ({
    type: ThemesActionType.ThemeEditSuccess,
    payload: { theme }
});

export const themeEditError = (error: IFirebaseError) => ({
    type: ThemesActionType.ThemeEditError,
    payload: { error }
});
