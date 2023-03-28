import {CloseOutlined} from "@mui/icons-material";
import {DateTimePicker} from "@mui/x-date-pickers";
import { HttpError, useApiUrl, useTranslate } from "@refinedev/core";
import { Show } from "@refinedev/mui";

import {
    Avatar,
    Box,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {ITransport} from "interfaces/ITransport";
import moment from "moment";
import React from "react";

export const ShowTransportDrawer: React.FC<UseModalFormReturnType<ITransport>> = ({
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
    return (
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
        >
            <Show
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
                        />
                        <input
                            id="file"
                            {...register("image_url", {
                                required: t("errors.required.field", { field: "Image" }),
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
                    {/*<Typography*/}
                    {/*    variant="body2"*/}
                    {/*    style={{*/}
                    {/*        fontWeight: 800,*/}
                    {/*        marginTop: "8px",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {t("transports.fields.image_description")}*/}
                    {/*</Typography>*/}
                    {/*<Typography style={{ fontSize: "12px" }}>*/}
                    {/*    {t("transports.fields.image_validation")}*/}
                    {/*</Typography>*/}
                </Stack>
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
                        disabled
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
                        disabled
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
                                        disabled
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio/>}
                                        label={t("transports.fields.status.disable")}
                                        disabled
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>

                    <Controller
                        control={control}
                        name="startDate"
                        // eslint-disable-next-line
                        defaultValue={moment()}
                        render={({field}) => (

                            <DateTimePicker
                                {...field}
                                //inputFormat="DD.MM.YYYY hh:mm"
                                //ampm={false}
                                disabled
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t("transports.fields.created_at")}
                                        margin="normal"
                                        variant="outlined"
                                        size={"small"}
                                    />
                                )}
                            />
                        )}
                    />
                </Box>
            </Show>
        </Drawer>
    );
};
