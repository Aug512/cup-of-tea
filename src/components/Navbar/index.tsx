import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/auth/useAuth';

import { authSelector } from 'store/selectors/authSelector';
import { ContentWrapper } from 'components/ContentWrapper';
// import { useActions } from '../../hooks/useActions';
// import { IState } from '../../types/stateTypes';

import { Button } from 'components/Button';
import { Link } from 'components/Link';

import styles from './Navbar.module.css';

export const Navbar = (): React.ReactElement => {
    // const isAdmin = useSelector<IState, any>(state => Boolean(state.userData.isAdmin));
    const { requestSignOut } = useAuth();
    const { user: { name } } = useSelector(authSelector);

    const handleSignOut = useCallback(() => {
        requestSignOut();
    }, [requestSignOut]);

    return (
        <ContentWrapper className={styles.container}>
            <div className={styles.links}>
                <Link to="/">К Темам</Link>
            </div>
            {/* <div className={styles.navLinkContainer}>
                <Link className={styles.navLink} to="/settings">Settings</Link>
            </div> */}
            {/* {isAdmin && (
                <div className={styles.navLinkContainer}>
                    <Link className={styles.navLink} to="/admin">Админка</Link>
                </div>
            )} */}
            <div className={styles.userData}>
                <div className={styles.greetings}>Привет, {name}!</div>
            <Button className={styles.signOutBtn} onClick={handleSignOut}>Выход</Button>
            </div>
            
        </ContentWrapper>
    )
}