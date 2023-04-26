export interface IRole {
    id: number;
    name: string;
    role_key: string;
    description: string;
    created_at: string;
}

export interface ICreateRole {
    name: string;
    role_key: string;
    description: string;
    creator: string;
}

export interface IUpdateRole {
    name: string;
    role_key: string;
    description: string;
}