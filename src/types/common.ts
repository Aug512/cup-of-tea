export type TThemeId = `theme-${number}`;

export enum UserRole {
    Admin = 'admin',
    Artist = 'artist',
}

export interface IThemeData {
    beat: string;
    id: TThemeId;
    isCurrent: boolean;
    name: string;
    teams: IThemeTeam[];
}

export interface IFirebaseError {
    //TODO: use only strings;
    code: string | number;
    message: string;
}

export interface IUser {
    uid?: string;
    role: UserRole
    name: string;
}

export type TUsers = Record<string, IUser>;

export interface IThemeTeam {
    text: string;
    track: string;
    isReady: boolean;
    users: string[];
}
