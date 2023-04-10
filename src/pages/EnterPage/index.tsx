import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LoginPage } from 'pages/LoginPage';
import { RegisterPage } from 'pages/RegisterPage';

export const EnterPage = (): React.ReactElement => {
    return (
        // <div className={styles.pageContainer}>
        <div>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/register">
                    <RegisterPage />
                </Route>
                <Route path="*">
                    <Redirect to="/login" />
                    <LoginPage />
                </Route>
            </Switch>
        </div>
    )
}
