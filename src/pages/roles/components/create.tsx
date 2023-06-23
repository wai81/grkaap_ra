import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import {useGetIdentity, useTranslate} from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Box, Drawer, IconButton, TextField } from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";
import {IUser} from "../../../interfaces/IUser";
import {ICreateRole} from "../../../interfaces/IRole";



export const CreateRoleDrawer: React.FC<
    UseModalFormReturnType<ICreateRole>
    > = ({
         modal: {
              visible,
              close,
          },
          handleSubmit,
          register,
          saveButtonProps,
          control,
          formState: {errors},
          refineCore:{onFinish, formLoading},
          reset,
      }) => {
    const t = useTranslate();


   const { data: user } = useGetIdentity<IUser>();

    const handleOnSubmitForm = (data: any) => {

        const event: ICreateRole = {
            name: data.name,
            role_key: data.role_key,
            description: data.description,
            creator_id: user?.id,
        };
        onFinish(event);
        reset((formValues) => {
            formValues.name = '';
            formValues.role_key = '';
            formValues.description = '';
            close();
        });

    }

    return (

        <Drawer
            open={visible}
            onClose={() => close()}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}

        >

                <Create
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
                        autoComplete="off"
                        sx={{ display: "flex", flexDirection: "column" }}
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
                            label={t('admin/roles.fields.name')}
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
                            label={t('admin/roles.fields.roles_key_item')}
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
                    </Box>
                </Create>

        </Drawer>

    );
};