import { AuthActionType } from 'types/actionCreators/authActions';
import { IFirebaseError } from 'types/common';

export const loginSuccess = ({ uid, name }: { uid: string; name: string }) => ({
    type: AuthActionType.LoginSucces,
    payload: { uid, name }
});

export const loginError = (error: IFirebaseError) => ({
    type: AuthActionType.LoginError,
    payload: { error }
});

export const signOutSuccess = () => ({
    type: AuthActionType.SignOutSucces,
});

export const createUserSuccess = ({ uid, name }: { uid: string; name: string }) => ({
    type: AuthActionType.CreateUserSuccess,
    payload: { uid, name }
});

export const createUserError = (error: IFirebaseError) => ({
    type: AuthActionType.CreateUserError,
    payload: { error }
});
