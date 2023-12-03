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
    InputAdornment, InputLabel, MenuItem,
    Radio,
    RadioGroup, Select,
    TextField,
} from "@mui/material";

import moment from "moment/moment";
import {IUpdateRegistrationAppointment} from "../../interfaces/IRegistrationAppointment";
import {CloseOutlined} from "@mui/icons-material";
import {DateTimePicker} from "@mui/x-date-pickers";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import DescriptionIcon from '@mui/icons-material/Description';
import EventNoteIcon from '@mui/icons-material/EventNote';

export const EditRegistrationAppointmentsDrawer: React.FC<
    UseModalFormReturnType<IUpdateRegistrationAppointment>
    >=(
        {
            setValue,
            register,
            formState: { errors },
            control,
            refineCore: { onFinish, formLoading },
            handleSubmit,
            modal: { visible, close },
        }) => {
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

    const getEndDate = (startDate:Date, duration:number)=>{
        const result = moment(startDate).add(duration,'h').toISOString();
        return result
    }

    const handleOnSubmit = (data: any) => {

        const event: IUpdateRegistrationAppointment = {
            addressObject: data.addressObject,
            costumerContactPhone: data.costumerContactPhone,
            costumerName: data.costumerName,
            executor: data.executor,
            statusAppointment: data.statusAppointment,
            typeRegistration: data.typeRegistration,
            startDate: moment(data.startDate).toISOString(),
            duration: data.duration,
            endDate: getEndDate(data.startDate, data.duration),
            description: data.description,
            subunit_id: data.subunit.id,
            organization_id: data.subunit.organization.id
            //is_active: data.is_active,
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
                        <Controller
                            control={control}
                            name={"statusAppointment"}
                            render={({field}) =>(
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <EventNoteIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                                    <FormControl margin="dense" size="small" fullWidth>
                                        <InputLabel id={'statusAppointment-select'}>
                                            {t('registration_appointment.fields.statusAppointmentLabel')}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="statusAppointment-select"
                                            label={t("registration_appointment.fields.statusAppointmentLabel")}
                                            defaultValue="NEW"
                                        >
                                            <MenuItem value="NEW">
                                                {t("registration_appointment.fields.statusAppointment.new")}
                                            </MenuItem>
                                            <MenuItem value="APPOINTED" sx={{color:'green'}}>
                                                {t("registration_appointment.fields.statusAppointment.appointed")}
                                            </MenuItem>
                                            <MenuItem value="CANCELLED" sx={{color:'red'}}>
                                                {t("registration_appointment.fields.statusAppointment.cancelled")}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        />
                        <Controller
                            control={control}
                            name="startDate"
                            // eslint-disable-next-line
                            defaultValue={moment()}
                            render={({field}) => (
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <AccessTimeIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                                    <DateTimePicker
                                    {...field}
                                    //inputFormat="DD.MM.YYYY hh:mm"
                                    //ampm={false}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   label={t('registration_appointment.fields.startDate')}
                                                   margin="normal"
                                                   variant="outlined"
                                                   required
                                                   fullWidth
                                                   size={'small'}

                                        />}
                                    />
                                </Box>
                            )}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AvTimerIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("duration", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.duration}
                                helperText={(errors as any)?.duration?.message}
                                margin="normal"
                                fullWidth
                                // InputLabelProps={{shrink: true}}
                                type="number"
                                label={t('registration_appointment.fields.duration')}
                                name="duration"
                                size={'small'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <ChromeReaderModeIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("typeRegistration", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.typeRegistration}
                                helperText={(errors as any)?.typeRegistration?.message}
                                margin="normal"
                                fullWidth
                                //InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('registration_appointment.fields.typeRegistration')}
                                name="typeRegistration"
                                variant="outlined"
                                size={'small'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LocationOnIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("addressObject", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.addressObject}
                                helperText={(errors as any)?.addressObject?.message}
                                margin="normal"
                                fullWidth
                                //InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('registration_appointment.fields.addressObject')}
                                name="addressObject"
                                variant="outlined"
                                size={'small'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FaceIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("costumerName", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.costumerName}
                                helperText={(errors as any)?.costumerName?.message}
                                margin="normal"
                                fullWidth
                                //InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('registration_appointment.fields.costumerName')}
                                name="costumerName"
                                variant="outlined"
                                size={'small'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PhoneAndroidIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("costumerContactPhone", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.costumerContactPhone}
                                helperText={(errors as any)?.costumerContactPhone?.message}
                                margin="normal"
                                fullWidth
                                //InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('registration_appointment.fields.costumerContactPhone')}
                                name="costumerContactPhone"
                                variant="outlined"
                                size={'small'}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PersonIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("executor", {
                                    required: t('required.field')
                                })}
                                error={!!(errors as any)?.executor}
                                helperText={(errors as any)?.executor?.message}
                                margin="normal"
                                fullWidth
                                //InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('registration_appointment.fields.executor')}
                                name="executor"
                                variant="outlined"
                                size={'small'}
                            />
                        </Box>
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
                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <GroupsIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                                            <TextField
                                                {...params}
                                                label={t('registration_appointment.fields.subunit')}
                                                margin="normal"
                                                variant="outlined"
                                                error={!!(errors)?.subunit}
                                                helperText={(errors as any)?.subunit?.message}
                                                required
                                                fullWidth
                                                size={'small'}
                                            />
                                        </Box>
                                    )}
                                />
                            )}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <DescriptionIcon sx={{ color: 'action.active', mr: 0.5, my: 2,}}/>
                            <TextField
                                {...register("description")}
                                error={!!(errors as any)?.description}
                                helperText={(errors as any)?.description?.message}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{shrink: true}}

                                type="text"
                                label={t('registration_appointment.fields.description')}
                                name="description"
                                multiline
                                minRows={2}
                                maxRows={2}
                                size={'small'}
                            />
                        </Box>
                        <Controller
                            control={control}
                            name="created_at"
                            // eslint-disable-next-line
                            //defaultValue={moment()}
                            render={({field}) => (

                                <DateTimePicker
                                    {...field}
                                    //inputFormat="DD.MM.YYYY hh:mm"
                                    //ampm={false}
                                    disabled
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label={t("registration_appointment.fields.created_at")}
                                            margin="normal"
                                            variant="outlined"
                                            size={"small"}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Box>
                </Edit>
            </form>
        </Drawer>
    )
}