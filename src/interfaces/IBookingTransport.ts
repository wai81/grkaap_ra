import {ISubunit} from "./ISubunit";
import {ITransport} from "./ITransport";
import {IOrganization} from "./IOrganization";

export interface IBookingTransport {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    allDay: boolean;
    description: string;
    count_man: number;
    subunit: ISubunit;
    transport: ITransport;
    organization: IOrganization;
    created_at: string;
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
    description?: string;
    count_man: number;
    subunit_id?: ISubunit["id"];
    transport_id?: ITransport["id"];
    organization_id?: IOrganization["id"];
}

export interface IUpdateBookingTransport {
    title: string;
    startDate: string;
    endDate: string;
    allDay?: boolean;
    description?: string;
    count_man: number;
    subunit_id?: ISubunit["id"];
    transport_id?: ITransport["id"];
    organization_id?: IOrganization["id"];
    is_active: boolean;
}