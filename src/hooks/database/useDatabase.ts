/* eslint-disable no-debugger */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { child, get, ref, update } from 'firebase/database';

import { useFirebase } from 'hooks/common/useFirebase';
import { useStorage } from 'hooks/storage/useStorage';
import { useActions } from 'hooks/common/useActions';

import { IFirebaseError, IThemeData, TThemeId, TUsers, UserRole } from 'types/common';

import { themeSelector } from 'store/selectors/themesSelector';
import { authSelector } from 'store/selectors/authSelector';

import { getTrackName } from 'lib';

export const useDatabase = () => {
    const { database } = useFirebase();
    const { getBeat, getTrackUrl } = useStorage();
    const { theme } = useSelector(themeSelector);
    const { user } = useSelector(authSelector);
    const {
        themesListSuccess,
        themesListError,
        themeRequestSuccess,
        themeRequestError,
    } = useActions();

    const databaseRef = ref(database);

    const getThemeRealIndex = useCallback((themeId: TThemeId) => Number(themeId.match(/\d/)?.[0] ?? 1) - 1, []);

    const getThemesList = useCallback(async () => {
        try {
            const snapshot = await get(child(databaseRef, 'themes/'))

            if (snapshot.exists()) {
                const listRaw = snapshot.val();
                const list = listRaw.reverse();
                themesListSuccess(list);
            } else {
                themesListError({ code: 404, message: 'Not found' });
            }
        } catch (error) {
            themesListError(error as IFirebaseError);
        }
    }, [databaseRef, themesListError, themesListSuccess]);

    const getThemeData = useCallback(async (themeId: TThemeId) => {
        try {
            const themeIndex = getThemeRealIndex(themeId);
            const snapshot = await get(child(databaseRef, `themes/${themeIndex}`));

            if (snapshot.exists()) {
                const beatUrl = await getBeat(themeId);

                const theme = snapshot.val() as IThemeData;
                theme.beat = beatUrl ?? '';
                Promise.all(theme.teams.map(async (team) => {
                    const trackUrl = await getTrackUrl(themeId, team.track) ?? team.track;
                    team.track = trackUrl;
                    return team;
                })).then(teamsWithTracksUrls => {
                    theme.teams = teamsWithTracksUrls;
                    themeRequestSuccess(theme);
                })
            } else {
                themeRequestError({ code: 404, message: 'Not found' });
            }
        } catch (error) {
            themeRequestError(error as IFirebaseError);
        }
    }, [databaseRef, getBeat, getThemeRealIndex, getTrackUrl, themeRequestError, themeRequestSuccess]);

    const getUsersList = useCallback(async () => {
        try {
            debugger;
            const snapshot = await get(child(databaseRef, 'users/'));

            debugger;

            if (snapshot.exists()) {
                const rawUsers: TUsers = snapshot.val();
                const users = Object.entries(rawUsers).reduce((acc, [key, value]) => {
                    const { uid, ...user } = value;
                    acc[key] = user;

                    return acc;
                }, {} as TUsers);

                return users;
            }
        } catch (error) {
            debugger;
        }
    }, [databaseRef]);

    const getUserLogin = useCallback(async (uid: string) => {
        try {
            const snapshot = await get(child(databaseRef, 'users/'))

            if (snapshot.exists()) {
                const users: TUsers = snapshot.val();
                const myLogin = Object.entries(users).reduce((login, [key, value]) => {
                    if (uid === value.uid) {
                        login = key;
                    }

                    return login;
                }, '');

                return myLogin;
            }
        } catch (error) { /* empty */ }
    }, [databaseRef]);

    const getMyTeamIdx = useCallback(async () => {
        try {
            const myLogin = user.name ?? await getUserLogin(user.uid);
            const myTeamIdx = theme.teams.findIndex(team => Boolean(team.users.find(login => login === myLogin)));

            return myTeamIdx;
        } catch (error) { /* empty */}
    }, [getUserLogin, theme.teams, user]);

    const updateThemeData = useCallback(async (themeId: TThemeId, updatedThemeData: IThemeData, teamIdx?: number) => {
        try {
            const themeIndex = getThemeRealIndex(themeId);
            const selectedThemeDbRef = ref(database, `themes/${themeIndex}`);

            if (typeof teamIdx !== 'undefined') {
                const updatedTeams = theme.teams.map((team, idx) => {
                    const track = getTrackName(theme, idx)
                    return { ...team, track };
                });
                updatedThemeData.teams = updatedTeams;
            }

            await update(selectedThemeDbRef, updatedThemeData);
            return true;
        } catch (error) { /* empty */ }

    }, [database, getThemeRealIndex, theme]);

    const updateUsersList = useCallback(async ({ name, uid }: { name: string; uid: string }) => {
        try {
            const newUserData = { name, uid, role: UserRole.Artist };
            const selectedThemeDbRef = ref(database, 'users/');

            const snapshot = await get(selectedThemeDbRef);

            debugger;

            if (snapshot.exists()) {
                const users: TUsers = snapshot.val();
                users[name] = newUserData;

                await update(selectedThemeDbRef, users);
            }
        } catch (error) { /* empty */ }
    }, [database]);

    return {
        getThemesList,
        getThemeData,
        getUsersList,
        getUserLogin,
        getMyTeamIdx,
        updateThemeData,
        getThemeRealIndex,
        updateUsersList
    };
}
