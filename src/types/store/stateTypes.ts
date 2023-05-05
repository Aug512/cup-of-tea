import { IFullThemeData, IThemeData, TUsers } from 'types/common';

export interface IAuthState {
    user: {
        uid: string;
        name: string;
        isAdmin?: true | never;
    };
}

export interface IThemesState {
    list: IThemeData[];
}

export interface IThemeState {
    theme: IFullThemeData;
}

export interface IUsersState extends TUsers {}
