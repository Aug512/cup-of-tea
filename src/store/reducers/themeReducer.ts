import { ThemesActionCreatorType, ThemesActionType } from 'types/actionCreators/themesActions';
import { IThemeData } from 'types/common';
import { IThemeState } from 'types/store/stateTypes';

const initialState = {
    theme: {
        beat: '',
        id: 'theme-0' as const,
        isCurrent: false,
        name: '',
        teams: [],
    },
}

export const themeReducer = (state: IThemeState = initialState, action: ThemesActionCreatorType) => {
    const { payload } = action as any;

    switch (action.type) {
        case ThemesActionType.ThemeRequestSuccess:
            return {
                ...state,
                theme: payload.theme as IThemeData,
            }
        case ThemesActionType.ThemeRequestError:
            return {
                ...state,
                error: payload.error,
            }

        default:
            return state;
    }
};
