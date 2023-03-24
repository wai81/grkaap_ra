export interface ITransport {
    id: string;
    title: string;
    image_url?:string;
    image_url_type?:string;
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
    image_url?:string
    image_url_type?:string;
    details?: string;
    is_active: boolean;
}

export interface IUpdateTransport {
    title: string;
    image_url?:string;
    image_url_type?:string;
    details?: string;
    is_active: boolean;
}