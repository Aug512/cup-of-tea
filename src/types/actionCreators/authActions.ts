import { IFirebaseError } from 'types/common';

export enum AuthActionType {
    LoginSucces = 'LOGIN_SUCCESS',
    LoginError = 'LOGIN_ERROR',
    SignOutSucces = 'SIGN_OUT_SUCCESS',
    CreateUserSuccess = 'CREATE_USER_SUCCESS',
    CreateUserError = 'CREATE_USER_ERROR',
}

interface ILoginSuccessActionCreator {
    type: AuthActionType.LoginSucces,
    payload: { uid: string; name: string }
}

interface ILoginErrorActionCreator {
    type: AuthActionType.LoginError,
    payload: { error: IFirebaseError }
}

interface ISignOutSuccessActionCreator {
    type: AuthActionType.SignOutSucces,
}

interface ICreateUserSuccessActionCreator {
    type: AuthActionType.CreateUserSuccess,
    payload: { uid: string; name: string }
}

interface ICreateUserErrorActionCreator {
    type: AuthActionType.CreateUserError,
    payload: { error: IFirebaseError }
}

export type AuthActionCreatorType =
    ILoginSuccessActionCreator |
    ILoginErrorActionCreator |
    ISignOutSuccessActionCreator |
    ICreateUserSuccessActionCreator |
    ICreateUserErrorActionCreator;
