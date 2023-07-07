import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { useTranslate} from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import {
    Box,
    Drawer,
    IconButton,
    TextField,
} from "@mui/material";
import {CloseOutlined} from "@mui/icons-material";
import {ICasbinObjectUpdate} from "../../interfaces/ICasbinObjects";


export const EditResourcesAppDrawer: React.FC<
    UseModalFormReturnType<ICasbinObjectUpdate>
>=({
    register,
    formState: { errors },
    refineCore: { onFinish, formLoading },
    handleSubmit,
    modal: { visible, close },
    })=>{

    const t = useTranslate();

    const handleOnSubmit = (data: any) => {
         const event: ICasbinObjectUpdate = {
            name: data.name,
            object_key: data.object_key,
            description: data.description,
         };
        onFinish(event);
        close();
    };

    return(
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
        >
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Edit
                    saveButtonProps={{
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
                </Edit>
            </form>
        </Drawer>
    )
}