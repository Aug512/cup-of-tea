import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { themeSelector } from 'store/selectors/themesSelector';

import { useActions } from 'hooks/common/useActions';
import { useFirebase } from 'hooks/common/useFirebase';

import { IThemeData, TThemeId } from 'types/common';
import { cloneObject, getTrackName } from 'lib';

export const useStorage = () => {
    const { storage } = useFirebase();
    const { theme } = useSelector(themeSelector);
    const { themeRequestSuccess } = useActions();

    const getBeat = useCallback(async (themeId: TThemeId) => {
        try {
            const pathReference = ref(storage, `beats/${themeId}.mp3`);
            const url = await getDownloadURL(pathReference);
            return url;
        } catch (error) {
            console.log(error);
        }
    }, [storage]);

    const getTrackUrl = useCallback(async (themeId: TThemeId, trackName: string) => {
        try {
            const pathReference = ref(storage, `tracks/${themeId}/${trackName}`);
            const url = await getDownloadURL(pathReference);
            return url;
        } catch (error) {
            console.log(error);
        }
    }, [storage]);

    const getTracksList = useCallback(async (theme: IThemeData) => {
        try {
            const updTheme = cloneObject(theme);
            Promise.all(theme.teams.map(async (team) => {
                const trackUrl = await getTrackUrl(theme.id, team.track) ?? team.track;
                team.track = trackUrl;
                return team;
            })).then(teamsWithTracksUrls => {
                updTheme.teams = teamsWithTracksUrls;
                themeRequestSuccess(theme);
            })
        } catch (error) {
            console.log(error);
        }
    }, [getTrackUrl, themeRequestSuccess]);

    const uploadTrack = useCallback(async (teamIdx: number, file: File) => {
        try {
            const { id, teams } = theme;
            const trackName = teams[teamIdx].track;
            const trackPath = `tracks/${id}/${trackName}`;
            const storageRef = ref(storage, trackPath);

            const snapshot = await uploadBytes(storageRef, file)

            if (snapshot) {
                const downloadUrl = await getDownloadURL(snapshot.ref);

                const updatedTheme = cloneObject(theme);
                updatedTheme.teams[teamIdx].track = downloadUrl;
                return updatedTheme;
            }
        } catch (error) { /* empty */ }
    }, [storage, theme]);

    const deleteTrack = useCallback(async (theme: IThemeData, teamIdx: number, trackName: string) => {
        try {
            const trackPath = `tracks/${theme.id}/${trackName}`;
            const storageRef = ref(storage, trackPath);

            await deleteObject(storageRef);
            const updatedTheme = cloneObject(theme);
            const defaultTrackName = getTrackName(theme, teamIdx);
            updatedTheme.teams[teamIdx].track = defaultTrackName;
            return updatedTheme;
        } catch (error) { /* empty */ }
    }, [storage]);

    return { getBeat, uploadTrack, getTracksList, getTrackUrl, deleteTrack };
}
