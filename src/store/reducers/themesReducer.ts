import { ThemesActionCreatorType, ThemesActionType } from 'types/actionCreators/themesActions';
import { IThemeData } from 'types/common';
import { IThemesState } from 'types/store/stateTypes';

const initialState = {
    list: [],
}

export const themesReducer = (state: IThemesState = initialState, action: ThemesActionCreatorType) => {
    const { payload } = action as any;

    switch (action.type) {
        case ThemesActionType.ThemesListSucces:
            return {
                ...state,
                list: payload.list as IThemeData[]
            }
        case ThemesActionType.ThemesListError:
            return {
                ...state,
                error: payload.error
            }

        default:
            return state;
    }
};
