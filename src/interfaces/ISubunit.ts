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
