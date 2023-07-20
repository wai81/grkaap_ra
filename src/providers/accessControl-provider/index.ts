import {BaseKey, IResourceItem, useGetIdentity} from "@refinedev/core";
import {IUser} from "../../interfaces/IUser";
import {API_URL, TOKEN_KEY} from "../../constants";
import axios from "axios";

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

export const accessControlProvider:IAccessControlContext ={

    can: async ({ action, params, resource }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        const result: any = await axios.get<{ url: string }>(
            `${API_URL}/users/can/?resource=${resource}&action=${action}`,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        // console.log(`${resource} (${action}) => ${result.data}`)
        if (result.status === 200) {
            console.log(`${resource} (${action}) => ${result.data}`)
            if (result.data === 'true'){
                return {
                    can: true,
                }
            } else {
                return {
                    can: false,
                }
            }
        }else {
            return {
                can: false,
            }
        }

        // const role = 'role_superuser'
        // const enforcer = await newEnforcer(modelRBAC, adapter);
        // if (
        //     action === "delete" ||
        //     action === "edit" ||
        //     action === "show"
        // ) {
        //     return Promise.resolve({
        //         can: await enforcer.enforce(
        //             role,
        //             `${resource}/${params?.id}`,
        //             action,
        //         ),
        //     });
        // }
        // if (action === "field") {
        //     return Promise.resolve({
        //         can: await enforcer.enforce(
        //             role,
        //             `${resource}/${params?.field}`,
        //             action,
        //         ),
        //     });
        // }
        //console.log(`${resource} ${action} ${res.data}`)

    },
}