import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useMountEffect } from 'hooks/common/useMountEffect';
import { useDatabase } from 'hooks/database/useDatabase';
import { useStorage } from 'hooks/storage/useStorage';

import { themeSelector } from 'store/selectors/themesSelector';

import { ContentWrapper } from 'components/ContentWrapper';
import { Button } from 'components/Button';
import { TeamsList } from 'components/TeamsList';
import { ThemeEdit } from 'components/ThemeEdit';

import { TThemeId } from 'types/common';

import styles from './ThemePage.module.css';
import { ThemeView } from 'components/ThemeView';

export const ThemePage = () => {
    const { themeId } = useParams<{ themeId: TThemeId }>();
    const { getThemeData, getMyTeamIdx } = useDatabase();
    const { getTracksList } = useStorage();
    const { theme } = useSelector(themeSelector);
    const [myTeamId, setMyTeamId] = useState<number | undefined>(undefined);
    const [viewedTeamId, setViewedTeamId] = useState<number | undefined>(undefined);
    const isLinksLoadedRef = useRef(false);
    const { name, beat, isCurrent, teams } = theme;

    const updateMyTeamIdx = useCallback(async () => {
        const myTeamIdx = await getMyTeamIdx();
        setMyTeamId(myTeamIdx);
    }, [getMyTeamIdx]);

    const handleTeamClick = useCallback((teamId: number) => {
        viewedTeamId === teamId ? setViewedTeamId(undefined) : setViewedTeamId(teamId);
    }, [viewedTeamId]);

    useMountEffect(() => {
        getThemeData(themeId);
    });

    useEffect(() => {
        if (isCurrent) {
            updateMyTeamIdx();
        } else if (!isLinksLoadedRef.current){
            getTracksList(theme);
            isLinksLoadedRef.current = true;
        }
    }, [getTracksList, isCurrent, theme, updateMyTeamIdx]);

    const handleTrackDownload = useCallback((trackUrl: string) => {
        window.open(trackUrl, '_blank');
    }, []);

    return (
        <ContentWrapper className={styles.container}>
            <h2 className={styles.themeName}>Тема: {name}</h2>
            <TeamsList className={styles.teamsContainer} teams={teams} myTeamIdx={myTeamId} isCurrent={isCurrent} onTeamClick={handleTeamClick} />
            {beat && (
                <>
                    <h3 className={styles.beatName}>Минус</h3>
                    <div className={styles.beatContainer}>
                        <audio className={styles.player} controls src={beat}></audio>
                        <Button className={styles.beatDownloadBtn} view="secondary" onClick={() => handleTrackDownload(beat)}>Скачать</Button>
                    </div>
                </>
            )}
            {isCurrent && myTeamId !== undefined && (
                <ThemeEdit className={styles.themeEdit} teamId={myTeamId} />
            )}
            {!isCurrent && viewedTeamId !== undefined && (
                <ThemeView className={styles.themeView} teamId={viewedTeamId} />
            )}
        </ContentWrapper>
    );
};
