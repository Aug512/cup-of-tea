import React from 'react';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useAuth } from 'hooks/auth/useAuth';

import { authSelector } from 'store/selectors/authSelector';
// import { useActions } from '../../hooks/useActions';
// import { IState } from '../../types/stateTypes';

// import { Button } from '../Button';

// import styles from './Navbar.module.css';

export const Navbar = (): React.ReactElement => {
    // const isAdmin = useSelector<IState, any>(state => Boolean(state.userData.isAdmin));
    const { requestSignOut } = useAuth();
    const { user: { name } } = useSelector(authSelector);

    return (
        <nav>
            <div>
                <Link to="/">Themes</Link>
            </div>
            {/* <div className={styles.navLinkContainer}>
                <Link className={styles.navLink} to="/settings">Settings</Link>
            </div> */}
            {/* {isAdmin && (
                <div className={styles.navLinkContainer}>
                    <Link className={styles.navLink} to="/admin">Админка</Link>
                </div>
            )} */}
            <div>hello, {name}!</div>
            <button onClick={requestSignOut}>Выход</button>
        </nav>
    )
}