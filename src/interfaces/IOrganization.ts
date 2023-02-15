export interface IOrganization {
    id: number,
    title: string,
    fullname: string,
    is_active: boolean
}

export interface IOrganizationCreate {
    id: number,
    title: string,
    fullname: string,
}


export interface IOrganizationUpdate {
    id: number,
    title: string,
    fullname: string,
    is_active: boolean
}