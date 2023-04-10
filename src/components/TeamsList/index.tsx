import React from 'react';
import cn from 'classnames';

import { IThemeData } from 'types/common';

import styles from './TeamsList.module.css';

interface ITeamsListProps {
    className?: string;
    teams: IThemeData['teams'];
    isCurrent: boolean;
    myTeamIdx?: number;
    onTeamClick?:(teamId: number) => void;
}

export const TeamsList: React.FC<ITeamsListProps> = (props) => {
    const { className, teams, isCurrent, myTeamIdx, onTeamClick } = props;

    const handleTeamClick = (teamIdx: number) => {
        if (isCurrent) {
            return;
        }
        onTeamClick?.(teamIdx);
    }

    return (
        <div className={className}>
            <p className={styles.teamsTitle}>Команды:</p>
            <div className={styles.teamsList}>
                {teams.map((team, idx) => (
                    <div
                        key={idx}
                        className={cn(styles.team, { [styles.highlighted]: myTeamIdx !== undefined && idx === myTeamIdx, [styles.interactive]: !isCurrent })}
                        onClick={() => handleTeamClick(idx)}
                    >
                        Команда {idx + 1}: {team.users.join(', ')}
                    </div>
                ))}
            </div>
        </div>
    )
}