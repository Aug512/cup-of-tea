import React from 'react';
import cn from 'classnames';

import { IThemeData, TThemeId } from 'types/common';

import { TeamsList } from 'components/TeamsList';

import styles from './ThemeIsland.module.css';

interface IThemeIslandProps {
    className?: string;
    theme: IThemeData;
    onClick: (id: TThemeId) => void;
}

export const ThemeIsland: React.FC<IThemeIslandProps> = (props) => {
    const { className, theme, onClick } = props;
    const { id, name, isCurrent, teams } = theme;

    return (
        <div
            key={theme.id}
            className={cn(styles.theme, { [styles.current]: isCurrent }, className)}
            onClick={() => onClick(id)}
        >
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.status}>{isCurrent ? 'Текущая' : 'Закрытая'}</p>
            </div>
            <TeamsList teams={teams} isCurrent={theme.isCurrent}/>
        </div>
    );
}
