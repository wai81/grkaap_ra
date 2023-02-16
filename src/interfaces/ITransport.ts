import {ISubunitFilterVariables} from "./ISubunit";

export interface ITransport {
    id: string;
    title: string;
    details?: string;
    is_active: boolean;
    created_at: string;
}

export interface ITransporFilterVariables {
    q?: string;
    is_active?: boolean | string;
}

export interface ICreateTransport {
    title: string;
    details?: string;
    is_active: boolean;
}

export interface IUpdateTransport {
    title: string;
    details?: string;
    is_active: boolean;
}