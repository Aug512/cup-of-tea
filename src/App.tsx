import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
    BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';

import { useMountEffect } from 'hooks/common/useMountEffect';
import { useCookies } from 'hooks/common/useCookeies';
import { useActions } from 'hooks/common/useActions';

import { authSelector } from 'store/selectors/authSelector';

import { EnterPage } from 'pages/EnterPage';
import { CurrentPage } from 'pages/CurrentPage';

import './App.css';
import { Navbar } from 'components/Navbar';
import { ThemesPage } from 'pages/ThemesPage';
import { ThemePage } from 'pages/ThemePage';
import { AdminPage } from 'pages/AdminPage';
import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';

const App = () => {
    const { getCookies } = useCookies();
    const { loginSuccess } = useActions();
    const { user } = useSelector(authSelector);
    const history = useHistory();
    const isLoggedIn = Boolean(user.uid && user.name);
    // eslint-disable-next-line no-restricted-globals
    const initialUrl = useRef<string | null>(location.pathname ?? null);

    useMountEffect(() => {
        const [uid, name] = getCookies('uid', 'name');

        if (uid && name) {
            loginSuccess({ uid, name });
        }
    });

    return (
        <Router>
            {/* {isLoggedIn && <Navbar />}
            <Switch>
                {isLoggedIn && (
                    <>
                        <Route path="/themes">
                            <ThemesPage />
                        </Route>
                        <Route path="/theme/:themeId">
                            <ThemePage />
                        </Route>
                        {user.isAdmin && (
                            <Route path="/admin">
                                <AdminPage />
                            </Route>
                        )}
                    </>
                )}
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="*">
                    <Redirect to="/themes" />
                    <ThemesPage />
                </Route>
            </Switch> */}
            {isLoggedIn ? <CurrentPage /> : <EnterPage />}
        </Router>
    );
}

export default App;
