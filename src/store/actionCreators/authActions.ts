import { AuthActionType } from 'types/actionCreators/authActions';

export const loginSuccess = ({ uid, name }: { uid: string; name: string }) => ({
    type: AuthActionType.LoginSucces,
    payload: { uid, name }
});

export const signOutSuccess = () => ({
    type: AuthActionType.SignOutSucces,
});

export const createUserSuccess = ({ uid, name }: { uid: string; name: string }) => ({
    type: AuthActionType.CreateUserSuccess,
    payload: { uid, name }
});
