import Reactfrom, {useEffect, useMemo, useState} from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";

import {HttpError, useList, useOne, useShow, useTranslate} from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import {
    Box, Checkbox,
    Drawer, FormControlLabel, FormGroup, FormLabel,
    IconButton,
    TextField, Typography,
} from "@mui/material";

import {CloseOutlined} from "@mui/icons-material";
import {ICasbinObjectUpdate} from "../../interfaces/ICasbinObjects";
import {IRole, IRolePermissions, IUpdateRole} from "../../interfaces/IRole";
import {CheckedPermissions} from "./checkedPermissions";


type ArrayType = Array<Array<string>>;

export const EditRoleDrawer: React.FC<
    UseModalFormReturnType<IRole>
>=({
    setValue,
    register,
    formState: { errors },
    control,
    refineCore: { onFinish, formLoading, id  },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
    })=>{

    const t = useTranslate();

    const handleOnSubmitForm = (data: any) => {
         const event: IUpdateRole = {
            name: data.name,
            role_key: data.role_key,
            description: data.description,
         };
        onFinish(event);
        close();
    };



     const { data } = useOne<IRolePermissions,HttpError>({
         resource: 'admin/roles/get_permissions',
         id,
     })

    const perm_checked: ArrayType =  data?.data.checkeds!
    const perm_options: ArrayType =  data?.data.options!

    return(
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
        >

                <Edit
                    saveButtonProps={{
                        ...saveButtonProps,
                        onClick: handleSubmit(handleOnSubmitForm)
                    }}
                    headerProps={{
                        avatar: (
                            <IconButton
                                onClick={() => close()}
                                sx={{ width: "30px", height: "30px" }}
                            >
                                <CloseOutlined />
                            </IconButton>
                        ),
                        action: null,
                    }}
                    wrapperProps={{ sx: { overflowY: "scroll", height: "100vh" } }}
                    breadcrumb={''}
                >
                    <Box
                        component="form"
                        sx={{display: 'flex', flexDirection: 'column'}}
                        autoComplete="off"
                    >
                        <TextField
                            {...register("name", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.name}
                            helperText={(errors as any)?.name?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('admin/objects.fields.name')}
                            name="name"
                            variant="outlined"
                            size={'small'}
                        />

                        <TextField
                            {...register("role_key", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.role_key}
                            helperText={(errors as any)?.role_key?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('admin/roles.fields.role_key_item')}
                            name="role_key"
                            size={'small'}
                        />


                        <TextField
                            {...register("description")}
                            error={!!(errors as any)?.description}
                            helperText={(errors as any)?.description?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('admin/roles.fields.description')}
                            name="description"
                            multiline
                            minRows={2}
                            maxRows={2}
                            size={'small'}
                        />
                        <FormLabel
                            sx={{
                                //marginBottom: "5px",
                                fontWeight: "500",
                                // fontSize: "14px",
                                color: "text.primary",
                            }}
                            //required
                        >
                            {t("admin/roles.fields.checkedPermissions")}
                        </FormLabel>
                        <FormGroup>
                            {CheckedPermissions(perm_options, perm_checked)}
                        </FormGroup>
                    </Box>
                </Edit>

        </Drawer>
    )
}