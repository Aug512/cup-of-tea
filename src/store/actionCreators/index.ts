import * as authActions from './authActions';
import * as themesActions from './themesActions';

const actionCreators = {
    ...authActions,
    ...themesActions,
}

export default actionCreators;
