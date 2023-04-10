import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './reducers/authReducer';
import { themeReducer } from './reducers/themeReducer';
import { themesReducer } from './reducers/themesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    themes: themesReducer,
    theme: themeReducer,
});

export default rootReducer;
