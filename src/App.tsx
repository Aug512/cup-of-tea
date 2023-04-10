import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

import { useCookies } from 'hooks/common/useCookeies';
import { useActions } from 'hooks/common/useActions';
import { authSelector } from 'store/selectors/authSelector';

import { EnterPage } from 'pages/EnterPage';
import { CurrentPage } from 'pages/CurrentPage';

import './App.css';
import { useMountEffect } from 'hooks/common/useMountEffect';

const App = () => {
    const { getCookies } = useCookies();
    const { loginSuccess } = useActions();
    const { user } = useSelector(authSelector);
    const isLoggedIn = Boolean(user.uid && user.name);

    useMountEffect(() => {
        const [uid, name] = getCookies('uid', 'name');

        if (uid && name) {
            loginSuccess({ uid, name });
        }
    });

    return (
        <Router>
            {isLoggedIn ? <CurrentPage /> : <EnterPage />}
        </Router>
    );
}

export default App;
