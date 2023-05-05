import * as authActions from './authActions';
import * as themesActions from './themesActions';

const throwError = (errorMessage: string) => ({
    type: 'ERROR',
    payload: { message: errorMessage },
});

const actionCreators = {
    ...authActions,
    ...themesActions,
    throwError,
}

export default actionCreators;
