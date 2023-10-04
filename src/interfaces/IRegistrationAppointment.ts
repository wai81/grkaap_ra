import {ISubunit} from "./ISubunit";
import {IOrganization} from "./IOrganization";
import {IUser} from "./IUser";

// export interface IStatusAppointment{
//
// }

enum statusRegistrationAppointment {
    new = "NEW",
    appointed =  "APPOINTED",
    cancelled = "CANCELLED"
}

export interface IRegistrationAppointment {
    id: string;
    startDate: string;
    duration:number
    endDate: string;
    typeRegistration: string;
    addressObject:string;
    costumerName:string;
    costumerContactPhone:string;
    description?: string;
    executor: string;
    statusAppointment: statusRegistrationAppointment ;
    subunit?: ISubunit;
    organization?: IOrganization;
    created_at: string;
    creator?: IUser;
    // is_active: boolean;
}

export interface ICreateRegistrationAppointment {
    startDate: string;
    endDate: string;
    duration:number
    typeRegistration: string;
    addressObject:string;
    costumerName:string;
    costumerContactPhone:string;
    executor: string;
    statusAppointment: "NEW" | "APPOINTED" | "CANCELLED" ;
    description?: string;
    subunit_id: ISubunit["id"];
    organization_id: IOrganization["id"];
    creator_id?: IUser["id"];
    // is_active: boolean;
}

export interface IUpdateRegistrationAppointment {
    startDate: string;
    endDate: string;
    duration:number
    typeRegistration: string;
    addressObject:string;
    costumerName:string;
    costumerContactPhone:string;
    executor: string;
    statusAppointment: "NEW" | "APPOINTED" | "CANCELLED" ;
    description?: string;
    subunit_id: ISubunit["id"];
    organization_id: IOrganization["id"];
    // is_active: boolean;
}