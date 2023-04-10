import { IThemeData } from 'types/common';

export function cloneObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export const getTrackName = (theme: IThemeData, teamIdx: number) => {
    const { name, teams } = theme;
    const team = teams[teamIdx].users;
    return `${team.join(' feat ')} - ${name}.mp3`;
}

