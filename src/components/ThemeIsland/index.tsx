import React from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router';

import { IThemeData, TThemeId } from 'types/common';

import { TeamsList } from 'components/TeamsList';

import styles from './ThemeIsland.module.css';

interface IThemeIslandProps {
    className?: string;
    theme: IThemeData;
}

export const ThemeIsland: React.FC<IThemeIslandProps> = (props) => {
    const { className, theme } = props;
    const { id, name, isCurrent, teams } = theme;
    const history = useHistory();

    const handleThemeClick = (themeId: TThemeId) => {
        history.push(`/theme/${themeId}`);
    }

    return (
        <div
            key={theme.id}
            className={cn(styles.theme, { [styles.current]: isCurrent }, className)}
            onClick={() => handleThemeClick(id)}
        >
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.status}>{isCurrent ? 'Текущая' : 'Закрытая'}</p>
            </div>
            <TeamsList teams={teams} />
        </div>
    );
}
