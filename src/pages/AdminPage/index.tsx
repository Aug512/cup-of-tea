import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { useMountEffect } from 'hooks/common/useMountEffect';
import { useAdmin } from 'hooks/admin/useAdmin';

import { authSelector } from 'store/selectors/authSelector';
// import { themesSelector } from 'store/selectors/themesSelector';

import { ContentWrapper } from 'components/ContentWrapper';
import { ThemeIsland } from 'components/ThemeIsland';

import styles from './AdminPage.module.css';

export const AdminPage = () => {
    const { user } = useSelector(authSelector);
    // const { list } = useSelector(themesSelector);
    const { themesList } = useAdmin();
    const history = useHistory();

    useMountEffect(() => {
        if (!user.isAdmin) {
            history.push('/themes');
        }
    });

    const handleThemeClick = useCallback(() => {}, []);

    return (
        <ContentWrapper>
            <h1 className={styles.title}>Список тем:</h1>
            {/* <button onClick={createTheme}>Создать новую ("закроет" все предыдущие)</button> */}
            <div className={styles.themesList}>
                {themesList.map(theme => (
                    <ThemeIsland
                        key={theme.id}
                        className={styles.theme}
                        theme={theme}
                        onClick={handleThemeClick}
                    />
                ))}
            </div>
            {/* {editingTheme && <ThemeSettingsModal editingTheme={editingTheme} />} */}
        </ContentWrapper>
    );
}
