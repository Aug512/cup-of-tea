import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { useDatabase } from 'hooks/database/useDatabase';
import { useMountEffect } from 'hooks/common/useMountEffect';
import { useThemes } from 'hooks/themes/useThemes';

import { themesSelector } from 'store/selectors/themesSelector';

import { TThemeId } from 'types/common';

import { ContentWrapper } from 'components/ContentWrapper';
import { ThemeIsland } from 'components/ThemeIsland';

import styles from './ThemesPage.module.css';

export const ThemesPage = () => {
    const { getThemesList } = useDatabase();
    const { isThemeAvaliable } = useThemes();
    const { list } = useSelector(themesSelector);
    const history = useHistory();

    useMountEffect(() => {
        if (list.length === 0) {
            getThemesList();
        }
    });

    const handleThemeClick = useCallback((themeId: TThemeId) => {
        if (isThemeAvaliable(themeId)) {
            history.push(`/theme/${themeId}`);
        }
    }, [history, isThemeAvaliable]);

    return (
        <ContentWrapper>
            <h1 className={styles.title}>Список тем:</h1>
            <div className={styles.subtitle}>
                Сверху - актуальная, за ней - "архив"
            </div>
            <div className={styles.themesList}>
                {list.map(theme => (
                    <ThemeIsland
                        key={theme.id}
                        className={styles.theme}
                        theme={theme}
                        onClick={handleThemeClick}
                    />
                ))}
            </div>
        </ContentWrapper>
    );
}