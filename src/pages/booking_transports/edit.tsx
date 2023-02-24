//import { MuiInferencer } from "@pankod/refine-inferencer/mui";

import {CrudFilters, useTranslate} from "@pankod/refine-core";
import {
    Autocomplete,
    Box,
    Edit,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField,
    useAutocomplete
} from "@pankod/refine-mui";
import {DateTimePicker} from '@mui/x-date-pickers';
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {IUpdateBookingTransport} from "interfaces/IBookingTransport";
import moment from "moment";
import GroupsIcon from '@mui/icons-material/Groups';
import AvTimerTwoToneIcon from "@mui/icons-material/AvTimerTwoTone";

export const Booking_transportEdit = () => {
    const {
        refineCore: {onFinish},
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<IUpdateBookingTransport>();
    const t = useTranslate();

    const {autocompleteProps: subunitAutocompleteProps} =
        useAutocomplete({
            resource: 'subunits',
            sort: [{field: 'id', order: 'asc'}],
            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            })
        });

    const {autocompleteProps: transportAutocompleteProps} =
        useAutocomplete({
            resource: 'transports',
            sort: [{field: 'id', order: 'asc'}],
            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            })
        });

    const getEndDate = (startDate:Date, duration:number)=>{
        return moment(startDate).add(duration,'h').toISOString();
    }

    const handleOnSubmit = (data: any) => {

        const event: IUpdateBookingTransport = {

            title: data.title,
            startDate: data.startDate,
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
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Edit
                saveButtonProps={{
                    type: 'submit',
                }}
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
                        rules={{required: 'This field is required'}}
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
                                        error={!!(errors as any)?.subunit?.id}
                                        helperText={(errors as any)?.subunit?.id?.message}
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
                            required: "This field is required",
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

    );
};
