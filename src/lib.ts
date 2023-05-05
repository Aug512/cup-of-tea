import { IThemeData, IThemeTeam, TThemeId } from 'types/common';

export function cloneObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export const getTrackName = (themeName: string, teamData: IThemeTeam) => {
    const team = teamData.users;
    return `${team.join(' feat. ')} - ${themeName}`;
}

export const getThemeRealIndex = (themeId: TThemeId) => Number(themeId.match(/\d/)?.[0] ?? 1) - 1;

interface IIsThemeParticipantProps {
    themeIdx: number;
    themesList: IThemeData[];
    userName: string;
}

export const isThemeParticipant = (props: IIsThemeParticipantProps) => {
    const { themeIdx, themesList, userName } = props;
    const theme = themesList[themeIdx];

    const participants = theme.teams.reduce<string[]>((acc, team) => {
        team.users.forEach(user => acc.push(user));
        return acc;
    }, []);

    return participants.some(artist => userName === artist);
};

export const getMyTeamIdx = (theme: IThemeData, userName: string ) => {
    const { teams } = theme;

    return teams.findIndex(team => team.users.some(user => user === userName));
}
