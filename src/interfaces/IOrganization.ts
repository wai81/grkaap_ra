export interface IOrganization {
    id: number,
    name: string,
    fullname: string,
    is_active: boolean
}

export interface IOrganizationCreate {
    id: number,
    name: string,
    fullname: string,
}


export interface IOrganizationUpdate {
    id: number,
    name: string,
    fullname: string,
    is_active: boolean
}