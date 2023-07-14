import { newEnforcer } from "casbin";
import {BaseKey, IResourceItem, useGetIdentity} from "@refinedev/core";
import {IUser} from "../../interfaces/IUser";

type CanParams = {
    resource: string;
    action: string;
    params?: {
        resource?: IResourceItem;
        id?: BaseKey;
        [key: string]: any;
    };
};

type CanReturnType = {
    can: boolean;
    reason?: string;
};

export interface IAccessControlContext {
    can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>;
    options?: {
        buttons?: {
            enableAccessControl?: boolean;
            hideIfUnauthorized?: boolean;
        };
    };
}

export const AccessControlProvider:IAccessControlContext ={

    //can: async ({ action, params, resource }:CanParams) => {
    //     const { data: user } = useGetIdentity<IUser>();
    //
    //     const enforcer = await newEnforcer(model, adapter);
    //     if (
    //         action === "delete" ||
    //         action === "edit" ||
    //         action === "show"
    //     ) {
    //         return Promise.resolve({
    //             can: await enforcer.enforce(
    //                 role,
    //                 `${resource}/${params?.id}`,
    //                 action,
    //             ),
    //         });
    //     }
    //     if (action === "field") {
    //         return Promise.resolve({
    //             can: await enforcer.enforce(
    //                 role,
    //                 `${resource}/${params?.field}`,
    //                 action,
    //             ),
    //         });
    //     }
    //     return {
    //         can: await enforcer.enforce(
    //             role,
    //             resource,
    //             action,
    //         ),
    //     };
    //},
}