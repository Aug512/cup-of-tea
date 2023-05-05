/* eslint-disable no-debugger */
import { browserLocalPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useHistory } from 'react-router';

import { useCookies } from 'hooks/common/useCookeies';
import { useFirebase } from 'hooks/common/useFirebase';
import { useActions } from 'hooks/common/useActions';

import { useCallback } from 'react';
import { useDatabase } from 'hooks/database/useDatabase';

interface IRequestLoginProps {
    login: string;
    password: string;
}

interface ICreateUserProps extends IRequestLoginProps {
    name: string;
}

const COOKIE_LIFETIME = Date.now() + 10 * 365 * 24 * 60 * 60 * 1000;
const defaultCookieOpts = { expires: COOKIE_LIFETIME, path: '/' };

export const useAuth = () => {
    const { auth } = useFirebase();
    const {
        loginSuccess,
        signOutSuccess,
        createUserSuccess,
        throwError,
    } = useActions();
    const { getUserLogin, updateUsersList, getUsersList } = useDatabase();
    const { setCookie, deleteCookies } = useCookies();
    const history = useHistory();

    const requestLogin = useCallback(async ({ login, password }: IRequestLoginProps) => {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, login, password);
            const user = userCredential.user;
            const userName = await getUserLogin(user.uid) ?? '';
            loginSuccess({ uid: user.uid, name: userName });
            setCookie({ name: 'uid', value: user.uid, options: defaultCookieOpts });
            setCookie({ name: 'name', value: userName, options: defaultCookieOpts });
        } catch (error) {
            debugger
            throwError('Что-то пошло не так');
        }
    }, [auth, getUserLogin, history, loginSuccess, setCookie, throwError]);

    const requestSignOut = useCallback(async () => {
        try {
            const auth = getAuth();
            await signOut(auth);

            deleteCookies();
            signOutSuccess();

            history.push('/login');
        } catch (error) {
            throwError('Что-то пошло не так');
        }
    }, [deleteCookies, history, signOutSuccess, throwError]);

    const createUser = useCallback(async ({ login, password, name }: ICreateUserProps) => {
        try {
            const auth = getAuth();
            const usersList = await getUsersList();

            if (usersList?.[name]) {
                throwError('Юзер с таким ником уже существует, придумай другой');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, login, password)
            const { uid } = userCredential.user;

            if (uid) {
                await updateUsersList({ name, uid });
                createUserSuccess({ uid, name });
                setCookie({ name: 'uid', value: uid, options: defaultCookieOpts });
                setCookie({ name: 'name', value: name, options: defaultCookieOpts });
            }
        } catch (error) {
            throwError('Что-то пошло не так');
        }
    }, [getUsersList, throwError, updateUsersList, createUserSuccess, setCookie]);

    return {
        requestLogin,
        requestSignOut,
        createUser,
    }
}
