import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useDatabase } from 'hooks/database/useDatabase';

import { authSelector } from 'store/selectors/authSelector';
import { themesSelector } from 'store/selectors/themesSelector';

import { TThemeId } from 'types/common';


export const useThemes = () => {
    const { user } = useSelector(authSelector);
    const { list: themesList } = useSelector(themesSelector);
    const { getThemeRealIndex } = useDatabase();

    const isThemeAvaliable = useCallback((themeId: TThemeId) => {
        const themeIdx = getThemeRealIndex(themeId);
        const theme = themesList[themeIdx];

        const participants = theme.teams.reduce<string[]>((acc, team) => {
            team.users.forEach(user => acc.push(user));
            return acc;
        }, []);

        return participants.some(artist => user.name === artist);
    }, [getThemeRealIndex, themesList, user.name]);

    return {
        themesList,
        isThemeAvaliable,
    }
}
