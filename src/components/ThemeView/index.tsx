import React, { FormEvent, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { useStorage } from 'hooks/storage/useStorage';
import { useDatabase } from 'hooks/database/useDatabase';
import { useFileInput } from 'hooks/common/useFileInput';
import { useActions } from 'hooks/common/useActions';

import { themeSelector } from 'store/selectors/themesSelector';

import { TextArea } from 'components/TextArea';
import { Button } from 'components/Button';
import { Tumbler } from 'components/Tumbler';

import { cloneObject, getTrackName } from 'lib';

import styles from './ThemeView.module.css';

interface IThemeViewProps {
    className?: string;
    teamId: number;
}

export const ThemeView: React.FC<IThemeViewProps> = ({ teamId, className }) => {
    const { theme } = useSelector(themeSelector);

    const teamData = theme.teams[teamId];
    const { text, track } = teamData;
    const trackName = getTrackName(theme, teamId);

    const handleDownloadTrack = useCallback((trackUrl: string) => {
        window.open(trackUrl, '_blank');
    }, []);


    return (
        <div className={cn(styles.container, className)}>
            <h2 className={styles.title}>{trackName.replace('.mp3', '')}:</h2>
            <div className={styles.audioContainer}>
                <audio className={styles.trackPlayer} controls src={track}></audio>
                <Button
                    className={styles.trackDownloadBtn}
                    view="primary"
                    onClick={() => handleDownloadTrack(track)}
                >
                    Скачать
                </Button>
            </div>
            <div className={styles.textField}>{text}</div>
        </div>
    )
}
