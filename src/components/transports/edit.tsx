import {CloseOutlined} from "@mui/icons-material";
import { HttpError, useApiUrl, useTranslate } from "@refinedev/core";
import { Edit } from "@refinedev/mui";

import {
    Avatar,
    Box,
    Drawer,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {IUpdateTransport} from "interfaces/ITransport";
import React from "react";
import axios from "axios";

export const EditTransportDrawer: React.FC<UseModalFormReturnType<IUpdateTransport>> = ({
                                                                                                       watch,
                                                                                                       setValue,
                                                                                                       register,
                                                                                                       formState: {errors},
                                                                                                       control,
                                                                                                       refineCore: {
                                                                                                           onFinish,
                                                                                                           formLoading
                                                                                                       },
                                                                                                       handleSubmit,
                                                                                                       modal: {
                                                                                                           visible,
                                                                                                           close
                                                                                                       },
                                                                                                       saveButtonProps,
                                                                                                       getValues,
                                                                                                   }) => {
    const t = useTranslate();
    const apiUrl = useApiUrl();
    const imageInput = watch("image_url");
    const onChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const formData = new FormData();

        const target = event.target;
        const file: File = (target.files as FileList)[0];

        formData.append("image", file);


        const res = await axios.post<{ url: string }>(
            `${apiUrl}/transports/image`,
            formData,
            {
                withCredentials: false,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );

        // eslint-disable-next-line
        const imagePaylod: any = [
            {
                filename: res.data.url,
            },
        ];

        setValue("image_url", res.data.url, {shouldValidate: true});
    };


    return (
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                headerProps={{
                    action: (
                        <IconButton
                            onClick={() => close()}
                            sx={{width: "30px", height: "30px"}}
                        >
                            <CloseOutlined/>
                        </IconButton>
                    ),
                    avatar: null,
                }}
                wrapperProps={{sx: {overflowY: "scroll", height: "100vh"}}}
                breadcrumb={""}
            >
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <form onSubmit={handleSubmit(onFinish)}>
                        <FormControl sx={{width: "100%"}}>
                            <FormLabel>{t("transports.fields.image")}</FormLabel>
                            <Stack
                                display="flex"
                                alignItems="center"
                                border="1px dashed  "
                                borderColor="primary.main"
                                borderRadius="5px"
                                padding="10px"
                                marginTop="5px"
                            >
                                <label htmlFor="images-input">
                                    <Input
                                        id="images-input"
                                        type="file"
                                        sx={{
                                            display: "none",
                                        }}
                                        onChange={onChangeHandler}
                                    />
                                    <input
                                        id="file"
                                        {...register("image_url", {
                                            required: t("errors.required.field", {field: "Image"}),
                                        })}
                                        type="hidden"
                                    />
                                    <Avatar
                                        sx={{
                                            cursor: "pointer",
                                            width: {
                                                xs: 130,
                                                md: 250,
                                            },
                                            height: {
                                                xs: 100,
                                                md: 180,
                                            },
                                            borderRadius:0
                                        }}
                                        src={`${apiUrl}/${imageInput}`}
                                        alt="Store Location"
                                    />
                                </label>
                                <Typography
                                    variant="body2"
                                    style={{
                                        fontWeight: 800,
                                        marginTop: "8px",
                                    }}
                                >
                                    {t("transports.fields.image_description")}
                                </Typography>
                                <Typography style={{fontSize: "12px"}}>
                                    {t("transports.fields.image_validation")}
                                </Typography>
                            </Stack>
                            {errors.image_url && (
                                <FormHelperText error></FormHelperText>
                            )}
                        </FormControl>
                        <TextField
                            {...register("title", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            helperText={(errors as any)?.title?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t("transports.fields.title")}
                            name="title"
                            variant="outlined"
                            size={"small"}
                        />
                        <TextField
                            {...register("description")}
                            error={!!(errors as any)?.description}
                            helperText={(errors as any)?.description?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t("transports.fields.details")}
                            name="description"
                            variant="outlined"
                            size={"small"}
                            multiline
                            minRows={2}
                            maxRows={2}
                        />
                        <FormControl>
                            <FormLabel
                                sx={{
                                    marginBottom: "5px",
                                    fontWeight: "700",
                                    // fontSize: "14px",
                                    color: "text.primary",
                                }}
                                required
                            >
                                {t("transports.fields.is_active")}
                            </FormLabel>
                            <Controller
                                control={control}
                                name="is_active"
                                // eslint-disable-next-line
                                defaultValue={true}
                                render={({field}) => (
                                    <RadioGroup
                                        {...field}
                                        onChange={(event) => {
                                            const value = event.target.value === "true";

                                            setValue("is_active", value, {
                                                shouldValidate: true,
                                            });

                                            return value;
                                        }}
                                        row
                                    >
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio/>}
                                            label={t("transports.fields.status.enable")}
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio/>}
                                            label={t("transports.fields.status.disable")}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </form>
                </Box>
            </Edit>
        </Drawer>
    );
};
