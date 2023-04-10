import React from 'react';
import { useSelector } from 'react-redux';

import { useDatabase } from 'hooks/database/useDatabase';
import { useMountEffect } from 'hooks/common/useMountEffect';

import { themesSelector } from 'store/selectors/themesSelector';

import { ContentWrapper } from 'components/ContentWrapper';
import { ThemeIsland } from 'components/ThemeIsland';

import styles from './ThemesPage.module.css';


export const ThemesPage = () => {
    const { getThemesList } = useDatabase();
    const { list } = useSelector(themesSelector);

    useMountEffect(() => {
        getThemesList();
    });

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
                    />
                ))}
            </div>
        </ContentWrapper>
    );
}