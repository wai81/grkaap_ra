import {IUser} from "./IUser";

export interface ICasbinObject {
    id: number;
    name: string;
    object_key: string;
    description: string;
    creator_id: string;
}

export interface ICasbinObjectCreate {
    name: string;
    object_key: string;
    description: string;
    creator_id?: IUser['id'];
}

export interface ICasbinObjectUpdate {
    name: string;
    object_key: string;
    description: string;
}

export interface ICasbinObjectFilterVariables{
    q?: string
 }