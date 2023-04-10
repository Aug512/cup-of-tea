import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useMountEffect } from 'hooks/common/useMountEffect';
import { useDatabase } from 'hooks/database/useDatabase';
import { useStorage } from 'hooks/storage/useStorage';

import { themeSelector } from 'store/selectors/themesSelector';

import { ThemeEdit } from 'components/ThemeEdit';

import { TThemeId } from 'types/common';

export const ThemePage = () => {
    const { themeId } = useParams<{ themeId: TThemeId }>();
    const { getThemeData, getMyTeamIdx } = useDatabase();
    const { getTracksList } = useStorage();
    const { theme } = useSelector(themeSelector);
    const [myTeamId, setMyTeamId] = useState<number | undefined>(undefined);
    const isLinksLoadedRef = useRef(false);

    const updateMyTeamIdx = useCallback(async () => {
        const myTeamIdx = await getMyTeamIdx();
        setMyTeamId(myTeamIdx);
    }, [getMyTeamIdx]);

    const { name, beat, isCurrent, teams } = theme;

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

    return (
        <div>
            <h3>Theme page</h3>
            <h2>{name}</h2>
            <div>{JSON.stringify(theme)}</div>
            {beat && <><audio controls src={beat}></audio><a href={beat}>Download</a></>}
            {!isCurrent && (
                <div>
                    <h4>Команды:</h4>
                    {teams.map((team, idx) => (
                        <div key={idx}>
                            <p>Команда {idx + 1}:</p>
                            <p>{team.users.join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
            {isCurrent && myTeamId !== undefined && (
                <div>
                    <h4>Моя команда:</h4>
                    <p>{teams[myTeamId].users.join(', ')}</p>
                    <ThemeEdit teamId={myTeamId} />
                </div>
            )}
        </div>
    );
};
