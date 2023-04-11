import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {ICreateBookingTransport, IUpdateBookingTransport} from "../../interfaces/IBookingTransport";
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

export const EditBookingTransportDrawer: React.FC<
    UseModalFormReturnType<IUpdateBookingTransport>
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

    const {autocompleteProps: subunitAutocompleteProps} =
        useAutocomplete({
            resource: 'subunits',

            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            }),

            sorters: [{field: 'id', order: 'asc'}]
        });

    const {autocompleteProps: transportAutocompleteProps} =
        useAutocomplete({
            resource: 'transports',

            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            }),

            sorters: [{field: 'id', order: 'asc'}]
        });

    const getEndDate = (startDate:Date, duration:number)=>{
        const result = moment(startDate, 'YYYY-MM-DD HH:mm').add(duration,'h').toISOString();
        return result
    }

    const handleOnSubmit = (data: any) => {

        const event: IUpdateBookingTransport = {

            title: data.title,
            startDate: moment(data.startDate).toISOString(),
            duration: data.duration,
            endDate: getEndDate(data.startDate, data.duration),
            allDay: false,
            count_man: data.count_man,
            description: data.description,
            subunit_id: data.subunit.id,
            transport_id: data.transport == null ? null : data.transport.id,
            organization_id: data.subunit.organization.id,
            is_active: data.is_active,
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
            <form  onSubmit={handleSubmit(handleOnSubmit)}>
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
                            {...register("title", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            helperText={(errors as any)?.title?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('booking_transport.fields.title')}
                            name="title"
                            variant="outlined"
                            size={'small'}
                        />
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
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   label={t('booking_transport.fields.startDate')}
                                                   margin="normal"
                                                   variant="outlined"
                                                   required
                                                   size={'small'}
                                        />}
                                />
                            )}
                        />
                        <TextField
                            {...register("duration", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.duration}
                            helperText={(errors as any)?.duration?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AvTimerTwoToneIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            type="number"
                            label={t('booking_transport.fields.duration')}
                            defaultValue={1}
                            name="duration"
                            size={'small'}
                        />
                        <Controller
                            control={control}
                            name="subunit"
                            rules={{required: t('required.field')}}
                            defaultValue={null as any}
                            render={({field}) => (
                                <Autocomplete
                                    {...subunitAutocompleteProps}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={(item) => {

                                        return (
                                            subunitAutocompleteProps?.options?.find(
                                                (p) => p.id === item.id
                                            )?.title ?? ''
                                        );
                                    }}
                                    isOptionEqualToValue={(option, value) => {

                                        return option.id === value.id;
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('booking_transport.fields.subunit')}
                                            margin="normal"
                                            variant="outlined"
                                            error={!!(errors)?.subunit}
                                            helperText={(errors as any)?.subunit?.message}
                                            required
                                            size={'small'}
                                        />
                                    )}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="transport"
                            defaultValue={null as any}
                            render={({field}) => (
                                <Autocomplete
                                    {...transportAutocompleteProps}
                                    {...field}
                                    onChange={(_, value) => {
                                        field.onChange(value);
                                    }}
                                    getOptionLabel={(item) => {

                                        return (
                                            transportAutocompleteProps?.options?.find(
                                                (p) => p.id === item.id
                                            )?.title ?? ''
                                        );
                                    }}
                                    isOptionEqualToValue={(option, value) => {

                                        return option.id === value.id;
                                    }}

                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t('booking_transport.fields.transport')}
                                            margin="normal"
                                            variant="outlined"
                                            error={!!(errors as any)?.transport?.id}
                                            helperText={(errors as any)?.transport?.id?.message}
                                            size={"small"}
                                        />
                                    )}
                                />
                            )}
                        />
                        <TextField
                            {...register("count_man", {
                                required: t('required.field'),
                            })}
                            error={!!(errors as any)?.count_man}
                            helperText={(errors as any)?.count_man?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <GroupsIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            type="number"
                            label={t('booking_transport.fields.count_man')}
                            defaultValue={1}
                            name="count_man"
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
                            label={t('booking_transport.fields.description')}
                            name="description"
                            multiline
                            minRows={2}
                            maxRows={2}
                            size={'small'}
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
                                {t('booking_transport.fields.is_active')}
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
                                            const value =
                                                event.target.value ===
                                                "true";

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
                                            label={t("booking_transport.fields.status.enable")}
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio/>}
                                            label={t("booking_transport.fields.status.disable")}
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                    </Box>
                </Edit>
            </form>
        </Drawer>
    )
}