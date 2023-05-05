/* eslint-disable no-debugger */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { child, get, ref, update } from 'firebase/database';

import { useFirebase } from 'hooks/common/useFirebase';
import { useStorage } from 'hooks/storage/useStorage';
import { useActions } from 'hooks/common/useActions';

import { IFirebaseError, IFullThemeData, IThemeData, TThemeId, TUsers, UserRole } from 'types/common';

import { themeSelector, themesSelector } from 'store/selectors/themesSelector';
import { authSelector } from 'store/selectors/authSelector';

import { getMyTeamIdx, getThemeRealIndex, getTrackName, isThemeParticipant } from 'lib';
import { useHistory } from 'react-router';

export const useDatabase = () => {
    const { database } = useFirebase();
    const { getBeat, getTrackUrl } = useStorage();
    const { theme } = useSelector(themeSelector);
    const { list: themesList } = useSelector(themesSelector);
    const { user } = useSelector(authSelector);
    const history = useHistory();
    const {
        themesListSuccess,
        throwError,
        themeRequestSuccess,
    } = useActions();

    const databaseRef = ref(database);

    const getThemesList = useCallback(async () => {
        try {
            const snapshot = await get(child(databaseRef, 'themes/'))

            if (snapshot.exists()) {
                const listRaw = snapshot.val() as IFullThemeData[];
                const list = listRaw.reduceRight<IThemeData[]>((acc, theme) => {
                    const formatted = {
                        ...theme,
                        teams: theme.teams.map(team => ({ users: team.users , isReady: team.isReady })),
                    }

                    acc.push(formatted);
                    return acc;
                }, []);
                themesListSuccess(list);
            } else {
                throwError('Темы не нашлись, что-то пошло не так...');
            }
        } catch (error) {
            throwError('Темы не нашлись, что-то пошло не так...');
        }
    }, [databaseRef, themesListSuccess, throwError]);

    const getThemeData = useCallback(async (themeId: TThemeId) => {
        try {
            const themeIdx = getThemeRealIndex(themeId);
            const isAvaliable = isThemeParticipant({ themesList, themeIdx, userName: user.name });

            if (!isAvaliable) {
                throwError('Тебе сюда нельзя, жди пока откроют для всех');
                history.push('/themes');
                return;
            }

            const snapshot = await get(child(databaseRef, `themes/${themeIdx}`));

            if (snapshot.exists()) {
                const theme = snapshot.val() as IFullThemeData;
                const beatUrl = await getBeat(themeId);
                theme.beat = beatUrl ?? theme.beat;

                if (theme.isCurrent) {
                    const myTeamIdx = getMyTeamIdx(theme, user.name);
                    const myTeamData = theme.teams[myTeamIdx];
                    const trackUrl = await getTrackUrl(themeId, myTeamData)

                    if (trackUrl) {
                        myTeamData.track = trackUrl;
                    }

                    const formattedTheme = {
                        ...theme,
                        teams: [myTeamData],
                    }

                    themeRequestSuccess(formattedTheme);
                }
                // Promise.all(theme.teams.map(async (team) => {
                //     const trackUrl = await getTrackUrl(themeId, team.track) ?? team.track;
                //     team.track = trackUrl;
                //     return team;
                // })).then(teamsWithTracksUrls => {
                //     theme.teams = teamsWithTracksUrls;
                //     themeRequestSuccess(theme);
                // })
            } else {
                throwError('Тема не нашлась, что-то пошло не так...');
            }
        } catch (error) {
            debugger;
            const { code } = error as IFirebaseError;
            if (code === 'auth/not-authorize') {
                throwError('Тема не нашлась, что-то пошло не так...');
                return;
            }

            throwError('Тема не нашлась, что-то пошло не так...');
        }
    }, [databaseRef, getBeat, getTrackUrl, history, themeRequestSuccess, themesList, throwError, user.name]);

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

    // const getMyTeamIdx = useCallback(async () => {
    //     try {
    //         const myLogin = user.name ?? await getUserLogin(user.uid);
    //         const myTeamIdx = theme.teams.findIndex(team => Boolean(team.users.find(login => login === myLogin)));

    //         return myTeamIdx;
    //     } catch (error) { /* empty */}
    // }, [getUserLogin, theme.teams, user]);

    const updateThemeData = useCallback(async (themeId: TThemeId, updatedThemeData: IFullThemeData, teamIdx?: number) => {
        try {
            const themeIndex = getThemeRealIndex(themeId);
            const selectedThemeDbRef = ref(database, `themes/${themeIndex}`);

            if (typeof teamIdx !== 'undefined') {
                const updatedTeams = theme.teams.map(team => {
                    const track = getTrackName(theme.name, team)
                    return { ...team, track };
                });
                updatedThemeData.teams = updatedTeams;
            }

            await update(selectedThemeDbRef, updatedThemeData);
            return true;
        } catch (error) { /* empty */ }

    }, [database, theme]);

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
