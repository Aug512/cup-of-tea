import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import { authSelector } from 'store/selectors/authSelector';

import { ThemePage } from 'pages/ThemePage';
import { ThemesPage } from 'pages/ThemesPage';
import { AdminPage } from 'pages/AdminPage';

import { Navbar } from 'components/Navbar';

export const CurrentPage = (): React.ReactElement => {
    const { user } = useSelector(authSelector);
    const history = useHistory();
    // eslint-disable-next-line no-restricted-globals
    const initialUrl = useRef<string | null>(location.pathname);

    useEffect(() => {
        // eslint-disable-next-line no-debugger
        debugger;
        if (!user?.name || !user?.uid || !history) {
            return;
        }
        // eslint-disable-next-line no-restricted-globals
        if (initialUrl.current && location.pathname !== initialUrl.current) {
            history.push(initialUrl.current);
            initialUrl.current = null;
        }
    }, [history, user?.name, user?.uid]);

    return (
        <>
            <Navbar />
            <Switch>
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
                {/* <Route path="/settings">
                    <SettingsPage />
                </Route> */}
                <Route path="*">
                    <Redirect to="/themes" />
                    <ThemesPage />
                </Route>
            </Switch>
        </>
    )
}
