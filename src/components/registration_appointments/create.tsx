import React from "react";
import {UseModalFormReturnType} from "@refinedev/react-hook-form";
import {Controller} from "react-hook-form";
import {CrudFilters, useGetIdentity, useTranslate} from "@refinedev/core";
import {Create, useAutocomplete} from "@refinedev/mui";
import {
    Autocomplete,
    Box,
    Drawer, FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment, InputLabel, MenuItem,
    Select,
    TextField
} from "@mui/material";
import moment from "moment/moment";
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

import {IUser} from "../../interfaces/IUser";
import {ICreateRegistrationAppointment} from "../../interfaces/IRegistrationAppointment";


export const CreateRegistrationAppointmentsDrawer: React.FC<
    UseModalFormReturnType<ICreateRegistrationAppointment>
    >=(
        {
            register, formState: {errors},
            control,
            modal: {
              visible,
              close,
          },
          handleSubmit,
          refineCore:{onFinish, formLoading},
          reset,
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


    const getEndDate = (startDate: Date, duration: number) => {
        const result = moment(startDate).add(duration,'h').toISOString();
        return result
    }

   const { data: user } = useGetIdentity<IUser>();

   const handleOnSubmit = (data: any) => {
        const event: ICreateRegistrationAppointment = {
            startDate: moment(data.startDate).toISOString(),//data.startDate,
            duration: data.duration,
            endDate: getEndDate(data.startDate, data.duration),
            typeRegistration: data.typeRegistration,
            addressObject: data.addressObject,
            costumerName: data.costumerName,
            costumerContactPhone: data.costumerContactPhone,
            executor: data.executor,
            statusAppointment: data.statusAppointment,
            description: data.description,
            subunit_id: data.subunit.id,
            organization_id: data.subunit.organization.id,
            creator_id: user?.id,
        };
        onFinish(event);
        reset((formValues) => {
            formValues.typeRegistration = '';
            formValues.addressObject= '';
            formValues.startDate = '';
            formValues.costumerName = '';
            formValues.costumerContactPhone = 1;
            formValues.subunit = '';
            formValues.executor='';
            formValues.organization='';
            formValues.statusAppointment='';
            close();
        });


    };

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
                        autoComplete="off"
                        sx={{ display: "flex", flexDirection: "column" }}
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
                                                       type="datetime-local"
                                                       margin="normal"
                                                       fullWidth
                                                       variant="outlined"
                                                       required
                                                       size={'small'}
                                                       InputLabelProps={{
                                                        shrink: true,
                                                      }}

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
                                //InputLabelProps={{shrink: true}}
                                type="number"
                                label={t('registration_appointment.fields.duration')}
                                defaultValue={2}
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
                                // InputLabelProps={{shrink: true}}
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
                                                fullWidth
                                                variant="outlined"
                                                error={!!(errors)?.subunit}
                                                helperText={(errors as any)?.subunit?.message}
                                                required
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
                                //InputLabelProps={{shrink: true}}

                                type="text"
                                label={t('registration_appointment.fields.description')}
                                name="description"
                                multiline
                                minRows={2}
                                maxRows={2}
                                size={'small'}
                            />
                        </Box>

                    </Box>
                </Create>
            </form>
        </Drawer>

    );
};