import { AuthActionCreatorType, AuthActionType } from 'types/actionCreators/authActions';
import { IAuthState } from 'types/store/stateTypes';

const adminUidsList = ['jEziykYvjhZ5561QtZ0dOMwm9zD2', 'ly6yIGfKkPegarqMCjFGnfAX3PB2'];

const initialState = {
    user: {
        uid: '',
        name: '',
    }
}

export const authReducer = (state: IAuthState = initialState, action: AuthActionCreatorType) => {
    const { payload } = action as any;
    const isAdmin = adminUidsList.some(uid => uid === payload?.uid);

    if (action.type === AuthActionType.LoginSucces && isAdmin) {
        payload.isAdmin = true;
    }

    switch (action.type) {
        case AuthActionType.LoginSucces:
            return {
                ...state,
                user: payload
            };
        
        case AuthActionType.SignOutSucces:
            return initialState;

        case AuthActionType.CreateUserSuccess:
            return {
                ...state,
                user: {
                    uid: payload.uid,
                    name: payload.name,
                },
            }

        default:
            return state;
    }
};
