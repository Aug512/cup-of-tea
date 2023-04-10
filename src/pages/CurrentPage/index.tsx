import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ThemePage } from 'pages/ThemePage';
import { ThemesPage } from 'pages/ThemesPage';

import { Navbar } from 'components/Navbar';

export const CurrentPage = (): React.ReactElement => {
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
                {/* <Route path="/admin">
                    <AdminPage />
                </Route> */}
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
