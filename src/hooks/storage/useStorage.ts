/* eslint-disable no-debugger */
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

import { themeSelector } from 'store/selectors/themesSelector';

import { useActions } from 'hooks/common/useActions';
import { useFirebase } from 'hooks/common/useFirebase';

import { IThemeData, TThemeId, IFirebaseError, IFullThemeData, IThemeTeam } from 'types/common';
import { FirebaseErrorCode } from 'types/firebaseErrors';

import { cloneObject, getTrackName } from 'lib';

export const useStorage = () => {
    const { storage } = useFirebase();
    const { theme } = useSelector(themeSelector);
    const { themeRequestSuccess, throwError } = useActions();

    const getBeat = useCallback(async (themeId: TThemeId) => {
        try {
            // TODO - поддержать WAV
            const pathReference = ref(storage, `beats/${themeId}.mp3`);
            const url = await getDownloadURL(pathReference);
            return url;
        } catch (error) {
            const { code } = error as IFirebaseError;
            if (code === FirebaseErrorCode.Storage_NotFound) {
                throwError('Бит должен быть, но ещё не загружен, напиши Владу/Диме');
                return;
            }
            throwError('Что-то пошло не так...');
            return;
        }
    }, [storage, throwError]);

    const getTrackUrl = useCallback(async (themeId: TThemeId, teamData: IThemeTeam) => {
        try {
            // const team = theme.teams[teamIdx];
            const pathReference = ref(storage, `tracks/${themeId}/`);
            const themeTracks = await listAll(pathReference);
            const existingTracks = themeTracks.items.map(item => item.name);
            const teamTrackNameRef = getTrackName(theme.name, teamData);
            const teamTrackName = existingTracks.find(track => track.includes(teamTrackNameRef));
            debugger;

            const trackRef = ref(storage, `tracks/${themeId}/${teamTrackName}`);
            const url = await getDownloadURL(trackRef);
            return url;
        } catch (error) {
            const { code } = error as IFirebaseError;
            if (code === FirebaseErrorCode.Storage_NotFound) {
                throwError('Трек должен быть, но его почему-то нет в базе, напиши Диме');
                return;
            }
            throwError('Что-то пошло не так...');
            return;
        }
    }, [storage, theme.name, throwError]);

    // const getTracksList = useCallback(async (theme: IFullThemeData) => {
    //     try {
    //         const updTheme = cloneObject(theme);
    //         Promise.all(theme.teams.map(async (team) => {
    //             const trackUrl = await getTrackUrl(theme.id, team.track) ?? team.track;
    //             team.track = trackUrl;
    //             return team;
    //         })).then(teamsWithTracksUrls => {
    //             updTheme.teams = teamsWithTracksUrls;
    //             themeRequestSuccess(theme);
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [getTrackUrl, themeRequestSuccess]);

    // const uploadTrack = useCallback(async (teamIdx: number, file: File) => {
    //     try {
    //         const { id, teams } = theme;
    //         const trackName = teams[teamIdx].track;
    //         const trackPath = `tracks/${id}/${trackName}`;

    //         const storageRef = ref(storage, trackPath);

    //         const snapshot = await uploadBytes(storageRef, file)

    //         if (snapshot) {
    //             const downloadUrl = await getDownloadURL(snapshot.ref);

    //             const updatedTheme = cloneObject(theme);
    //             updatedTheme.teams[teamIdx].track = downloadUrl;
    //             return updatedTheme;
    //         }
    //     } catch (error) { /* empty */ }
    // }, [storage, theme]);

    const deleteTrack = useCallback(async (theme: IFullThemeData, teamIdx: number, trackName: string) => {
        try {
            const trackPath = `tracks/${theme.id}/${trackName}`;
            const storageRef = ref(storage, trackPath);

            await deleteObject(storageRef);
            const updatedTheme = cloneObject(theme);
            // const defaultTrackName = getTrackName(theme, teamIdx);
            // updatedTheme.teams[teamIdx].track = defaultTrackName;
            return updatedTheme;
        } catch (error) { /* empty */ }
    }, [storage]);

    // return { getBeat, uploadTrack, getTracksList, getTrackUrl, deleteTrack };
    return { getBeat, getTrackUrl, deleteTrack };
}
