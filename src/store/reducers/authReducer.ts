import { AuthActionCreatorType, AuthActionType } from 'types/actionCreators/authActions';
import { IAuthState } from 'types/store/stateTypes';

const initialState = {
    user: {
        uid: '',
        name: '',
    }
}

export const authReducer = (state: IAuthState = initialState, action: AuthActionCreatorType) => {
    const { payload } = action as any;

    switch (action.type) {
        case AuthActionType.LoginSucces:
            return {
                ...state,
                user: {
                    uid: payload.uid,
                    name: payload.name,
                },
            }
        case AuthActionType.LoginError:
            return {
                ...state,
                error: payload.error
            }
        
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
        case AuthActionType.CreateUserError:
            return {
                ...state,
                error: payload.error
            }

        default:
            return state;
    }
};
