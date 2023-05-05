import { ThemesActionType } from 'types/actionCreators/themesActions';
import { IThemeData } from 'types/common';

export const themesListSuccess = (list: IThemeData[]) => ({
    type: ThemesActionType.ThemesListSucces,
    payload: { list }
});

export const themeRequestSuccess = (theme: IThemeData) => ({
    type: ThemesActionType.ThemeRequestSuccess,
    payload: { theme }
});
