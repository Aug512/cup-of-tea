import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './reducers/authReducer';
import { themeReducer } from './reducers/themeReducer';
import { themesReducer } from './reducers/themesReducer';
import { errorReducer } from './reducers/errorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    themes: themesReducer,
    theme: themeReducer,
    error: errorReducer,
});

export default rootReducer;
