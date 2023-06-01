import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {CrudFilters, HttpError, useTranslate} from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import {
    Autocomplete,
    Box,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

import moment from "moment/moment";
import {CloseOutlined} from "@mui/icons-material";
import {DateTimePicker} from "@mui/x-date-pickers";
import AvTimerTwoToneIcon from "@mui/icons-material/AvTimerTwoTone";
import GroupsIcon from "@mui/icons-material/Groups";
import {ICasbinObjectUpdate} from "../../../interfaces/ICasbinObjects";


export const EditResourcesAppDrawer: React.FC<
    UseModalFormReturnType<ICasbinObjectUpdate>
>=({
    setValue,
    register,
    formState: { errors },
    control,
    refineCore: { onFinish, formLoading },
    handleSubmit,
    modal: { visible, close },
    })=>{

    const t = useTranslate();


    const getEndDate = (startDate:Date, duration:number)=>{
        const result = moment(startDate, 'YYYY-MM-DD HH:mm').add(duration,'h').toISOString();
        return result
    }

    // const handleOnSubmit = (data: any) => {
    //
    //     const event: ICasbinObjectUpdate = {
    //
    //         title: data.title,
    //         startDate: moment(data.startDate).toISOString(),
    //         duration: data.duration,
    //         endDate: getEndDate(data.startDate, data.duration),
    //         allDay: false,
    //         count_man: data.count_man,
    //         description: data.description,
    //         subunit_id: data.subunit.id,
    //         transport_id: data.transport == null ? null : data.transport.id,
    //         organization_id: data.subunit.organization.id,
    //         is_active: data.is_active,
    //     };
    //     onFinish(event);
    //     close();
    // };

    return(
        <Drawer
            open={visible}
            onClose={close}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
        >
            {/*<form  onSubmit={handleSubmit(handleOnSubmit)}>*/}
                <Edit
                    saveButtonProps={{
                        type: 'submit',
                    }}
                    headerProps={{
                        action: (
                            <IconButton
                                onClick={() => close()}
                                sx={{ width: "30px", height: "30px" }}
                            >
                                <CloseOutlined />
                            </IconButton>
                        ),
                        avatar: null,
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
                        {/*<FormControl>*/}
                        {/*    <FormLabel*/}
                        {/*        sx={{*/}
                        {/*            marginBottom: "5px",*/}
                        {/*            fontWeight: "700",*/}
                        {/*            // fontSize: "14px",*/}
                        {/*            color: "text.primary",*/}
                        {/*        }}*/}
                        {/*        required*/}
                        {/*    >*/}
                        {/*        {t('booking_transport.fields.is_active')}*/}
                        {/*    </FormLabel>*/}
                        {/*    <Controller*/}
                        {/*        control={control}*/}
                        {/*        name="is_active"*/}
                        {/*        // eslint-disable-next-line*/}
                        {/*        defaultValue={true}*/}
                        {/*        render={({field}) => (*/}
                        {/*            <RadioGroup*/}
                        {/*                {...field}*/}
                        {/*                onChange={(event) => {*/}
                        {/*                    const value =*/}
                        {/*                        event.target.value ===*/}
                        {/*                        "true";*/}

                        {/*                    setValue("is_active", value, {*/}
                        {/*                        shouldValidate: true,*/}
                        {/*                    });*/}

                        {/*                    return value;*/}
                        {/*                }}*/}
                        {/*                row*/}
                        {/*            >*/}
                        {/*                <FormControlLabel*/}
                        {/*                    value={true}*/}
                        {/*                    control={<Radio/>}*/}
                        {/*                    label={t("booking_transport.fields.status.enable")}*/}
                        {/*                />*/}
                        {/*                <FormControlLabel*/}
                        {/*                    value={false}*/}
                        {/*                    control={<Radio/>}*/}
                        {/*                    label={t("booking_transport.fields.status.disable")}*/}
                        {/*                />*/}
                        {/*            </RadioGroup>*/}
                        {/*        )}*/}
                        {/*    />*/}
                        {/*</FormControl>*/}
                    </Box>
                </Edit>
            {/*</form>*/}
        </Drawer>
    )
}