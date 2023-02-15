import {IOrganization} from "./IOrganization";

export interface ISubunit {
    id: string,
    name: string,
    fullname: string,
    is_active: boolean,
    color_subunit: string,
    organization: IOrganization
    created_at: string;
}

export interface ISubunitFilterVariables {
    q?: string;
    organization?: string;
    is_active?: boolean | string;
}

export interface ICreateSubunit {
    name: string;
    fullname?: string;
    color_subunit?: string;
    organization_id?: IOrganization["id"];
}


export interface IUpdateSubunit {
    name: string,
    fullname?: string,
    color_subunit?: string,
    organization_id?: IOrganization["id"],
    is_active: boolean,
}