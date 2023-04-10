import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { useStorage } from 'hooks/storage/useStorage';
import { useDatabase } from 'hooks/database/useDatabase';
import { useFileInput } from 'hooks/common/useFileInput';
import { useActions } from 'hooks/common/useActions';

import { themeSelector } from 'store/selectors/themesSelector';

import { cloneObject, getTrackName } from 'lib';

interface IThemeEditProps {
    className?: string;
    teamId: number;
}

export const ThemeEdit: React.FC<IThemeEditProps> = ({ teamId }) => {
    const { theme } = useSelector(themeSelector);
    const { uploadTrack, deleteTrack } = useStorage();
    const { updateThemeData } = useDatabase();
    const { handleFileInputChange, file } = useFileInput();
    const { themeRequestSuccess, themeRequestError } = useActions();

    const myTeamData = theme.teams[teamId];
    const trackName = getTrackName(theme, teamId);

    const [text, setText] = useState(myTeamData.text);
    const [isReady, setIsReady] = useState(myTeamData.isReady);

    const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
        evt.preventDefault();

        setText(evt.target.value);
    }

    const handleDeleteTrack = async () => {
        const updatedTheme = await deleteTrack(theme, teamId, trackName);
        updatedTheme ? themeRequestSuccess(updatedTheme) : themeRequestError({code: 'uploadFailed', message: 'something went wrong'});
        return;
    }

    const handleSubmit = async (evt: FormEvent) => {
        evt.preventDefault();

        const updatedTeamData = {
            ...myTeamData,
            text,
            isReady,
            track: trackName,
        }

        const updatedThemeData = cloneObject(theme);
        updatedThemeData.teams[teamId] = updatedTeamData;

        const isUpdated = await updateThemeData(theme.id, updatedThemeData, teamId);

        if (!isUpdated) {
            return;
        }

        if (file) {
            const updatedTheme = await uploadTrack(teamId, file);
            updatedTheme ? themeRequestSuccess(updatedTheme) : themeRequestError({code: 'uploadFailed', message: 'something went wrong'});
            return;
        }

        themeRequestSuccess(updatedThemeData);
    }

    return (
        <>
            <form
                name='uploadForm'
                id='uploadForm'
                encType='multipart/form-data'
                onSubmit={handleSubmit}
                style={{ background: '#e5e5e5', marginTop: '20px' }}
            >
                <textarea
                    id ='text'
                    name='text'
                    placeholder='Текст'
                    onChange={handleTextChange}
                    value={text}
                />
                <label>
                    <input type='checkbox' checked={isReady} onChange={() => setIsReady(!isReady)} />
                    Готов к сдаче
                </label>
                <input
                    id ='audioLoader'
                    name='audioLoader'
                    accept='.mp3'
                    type='file'
                    onChange={handleFileInputChange}
                />
                {myTeamData.track && myTeamData.track !== trackName && (
                    <>
                        <audio controls src={myTeamData.track}></audio>
                        <a href={myTeamData.track}>Download</a>
                        <div onClick={() => handleDeleteTrack()}>Delete track</div>
                    </>
                )}
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}
