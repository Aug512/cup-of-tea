import { IFirebaseError, IThemeData, TUsers } from 'types/common';

export interface IAuthState {
    user: {
        uid: string;
        name: string;
    }
    error?: IFirebaseError;
}

export interface IThemesState {
    list: IThemeData[];
    error?: IFirebaseError;
}

export interface IThemeState {
    theme: IThemeData;
    error?: IFirebaseError;
}

export interface IUsersState extends TUsers {}
