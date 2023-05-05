interface IErrorState {
    message: string | null;
}

interface IErrorAction {
    type: 'ERROR',
    payload: string;
}

const initialState = {
    message: null,
};

export const errorReducer = (_state: IErrorState, action: IErrorAction) => {
    if (action.type === 'ERROR') {
        return action.payload;
    }

    return initialState;
}
