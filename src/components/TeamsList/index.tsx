import React from 'react';
import cn from 'classnames';

import { IThemeData } from 'types/common';

import styles from './TeamsList.module.css';

interface ITeamsListProps {
    className?: string;
    teams: IThemeData['teams'];
    myTeamIdx?: number;
}

export const TeamsList: React.FC<ITeamsListProps> = ({ className, teams, myTeamIdx }) => {
    return (
        <div className={className}>
            <p className={styles.teamsTitle}>Команды:</p>
            <div className={styles.teamsList}>
                {teams.map((team, idx) => (
                    <div className={cn(styles.team, { [styles.highlighted]: myTeamIdx !== undefined && idx === myTeamIdx })}>
                        Команда {idx + 1}: {team.users.join(', ')}
                    </div>
                ))}
            </div>
        </div>
    )
}