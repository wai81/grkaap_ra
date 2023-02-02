import { IOrganization } from './IOrganization';

export interface IUser {
  id: string;
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  is_superuser: boolean;
  is_active: boolean;
  organization: IOrganization;
  access_tors: [IOrganization];
  created_at: string;
}

export interface ICreateUser {
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  password: string;
  organization_id: number;
}

export interface IUpdateUser {
  username: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  password: string;
  organization_id: number | null;
  is_superuser: boolean;
  is_active: boolean;
}
