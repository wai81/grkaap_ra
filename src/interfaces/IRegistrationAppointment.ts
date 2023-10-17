import {ISubunit} from "./ISubunit";
import {IOrganization} from "./IOrganization";
import {IUser} from "./IUser";

// export interface IStatusAppointment{
//
// }

export enum statusRegistrationAppointment {
    new = "NEW",
    appointed =  "APPOINTED",
    cancelled = "CANCELLED"
}

export const EVENT_STATUS_COLORS = {
    NEW: "#3ca6f6",
    APPOINTED: "#7cea82",
    CANCELLED: "#ea7c7c",
};



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
    statusAppointment: string;//"NEW" | "APPOINTED" | "CANCELLED" ;
    subunit?: ISubunit;
    organization?: IOrganization;
    created_at: string;
    creator?: IUser;
    // is_active: boolean;
}

export interface EventItem {
    id: string;
    start: Date;
    end: Date;
    data?: { appointment?: IRegistrationAppointment };
    //isDraggable?: boolean;
};

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

export interface IRegistrationAppointmentFilterVariables {
    q?: string;
    organization?: string;
    subunit?: string;
    // transport?: string;
    // startDate?: [string,string];
    // endDate?: string;
    // allDay?: boolean | string;
    // is_active?: boolean | string;
}
