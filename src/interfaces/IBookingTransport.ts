import {ISubunit} from "./ISubunit";
import {ITransport} from "./ITransport";
import {IOrganization} from "./IOrganization";

export interface IBookingTransport {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    allDay: boolean;
    details: string;
    subunit: ISubunit;
    transport: ITransport;
    is_active: boolean;
}

export interface IBookingTransportFilterVariables {
    q?: string;
    subunit?: string;
    transport?: string;
    startDate?: string;
    endDate?: string;
    allDay?: boolean | string;
    is_active?: boolean | string;
}

export interface ICreateBookingTransport {
    title: string;
    startDate: string;
    endDate: string;
    allDay?: boolean;
    details?: string;
    subunit_id?: ISubunit["id"];
    transport_id?: ITransport["id"];
}

export interface IUpdateBookingTransport {
    title: string;
    startDate: string;
    endDate: string;
    allDay?: boolean;
    details?: string;
    subunit_id?: ISubunit["id"];
    transport_id?: ITransport["id"];
}