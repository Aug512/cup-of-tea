export enum AuthActionType {
    LoginSucces = 'LOGIN_SUCCESS',
    SignOutSucces = 'SIGN_OUT_SUCCESS',
    CreateUserSuccess = 'CREATE_USER_SUCCESS',
}

interface ILoginSuccessActionCreator {
    type: AuthActionType.LoginSucces,
    payload: { uid: string; name: string }
}

interface ISignOutSuccessActionCreator {
    type: AuthActionType.SignOutSucces,
}

interface ICreateUserSuccessActionCreator {
    type: AuthActionType.CreateUserSuccess,
    payload: { uid: string; name: string }
}

export type AuthActionCreatorType =
    ILoginSuccessActionCreator |
    ISignOutSuccessActionCreator |
    ICreateUserSuccessActionCreator;
