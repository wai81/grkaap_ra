import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import {useGetIdentity, useTranslate} from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { Box, Drawer, IconButton, TextField } from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";
import {ICasbinObjectCreate} from "../../interfaces/ICasbinObjects";
import {IUser} from "../../interfaces/IUser";



export const CreateResourcesAppDrawer: React.FC<
    UseModalFormReturnType<ICasbinObjectCreate>
    > = ({
         modal: {
              visible,
              close,
          },
          handleSubmit,
          register,
          control,
          formState: {errors},
          refineCore:{onFinish, formLoading},
          reset,
          saveButtonProps,
      }) => {
    const t = useTranslate();


   const { data: user } = useGetIdentity<IUser>();

    const handleOnSubmit = (data: any) => {

        const event: ICasbinObjectCreate = {
            name: data.name,
            object_key: data.object_key,
            description: data.description,
            creator_id: user?.id,
        };
        onFinish(event);
        reset((formValues) => {
            formValues.name = '';
            formValues.object_key = '';
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
            <form  onSubmit={handleSubmit(handleOnSubmit)}>
                <Create
                    saveButtonProps={{
                        //saveButtonProps
                        type: 'submit',
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
                            label={t('admin/objects.fields.name')}
                            name="name"
                            variant="outlined"
                            size={'small'}
                            />
                        <TextField
                            {...register("object_key", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.object_key}
                            helperText={(errors as any)?.object_key?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('admin/objects.fields.object_key_item')}
                            name="object_key"
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
                            label={t('admin/objects.fields.description')}
                            name="description"
                            multiline
                            minRows={2}
                            maxRows={2}
                            size={'small'}
                        />
                    </Box>
                </Create>
            </form>
        </Drawer>

    );
};