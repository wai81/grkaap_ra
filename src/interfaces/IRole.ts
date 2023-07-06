import {IUser} from "./IUser";

export interface IRole {
    id: number;
    name: string;
    role_key: string;
    description: string;
    created_at: string;
    creator_id: string;
}

export interface ICreateRole {
    name: string;
    role_key: string;
    description: string;
    creator_id?: IUser['id'];
}

export interface IUpdateRole {
    name: string;
    role_key: string;
    description: string;
}

export interface IRolePermissions {
    options: Array<Array<string>>;
    checkeds: Array<Array<string>>;
}

export interface IRolePermissionsUpdate {
    checkeds?: Array<Array<string>>;
}

export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};
