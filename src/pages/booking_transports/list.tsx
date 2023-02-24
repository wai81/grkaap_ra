import {
    BaseRecord,
    CrudFilters,
    getDefaultFilter,
    HttpError,
    useNavigation,
    useSelect,
    useTranslate
} from "@pankod/refine-core";
//import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import {
    Autocomplete,
    BooleanField,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    DataGrid,
    DateField,
    EditButton,
    FormControl,
    Grid,
    GridColumns,
    InputLabel,
    List,
    MenuItem,
    ruRU,
    Select,
    TextField,
    useAutocomplete,
    useDataGrid,
} from "@pankod/refine-mui";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {ItemStatus} from "components/itemStatus";
import React from "react";
import {IBookingTransport, IBookingTransportFilterVariables} from "../../interfaces/IBookingTransport";
import {IOrganization} from "../../interfaces/IOrganization";
import DatePicker, {DateObject} from "react-multi-date-picker"
import type {Value} from "react-multi-date-picker"
import Footer from "react-multi-date-picker/plugins/range_picker_footer"
import weekends from "react-multi-date-picker/plugins/highlight_weekends"

import moment from "moment/moment";
import locale_ru from "../../components/multiDatePicer/locale_ru";
import CustomRangeInput from "../../components/multiDatePicer/customRangeInput";
import CalendarShow from "../../components/calendar/CalendarShow";
import {API_URL} from "../../constants";


export const Booking_transportList = () => {

    const {show} = useNavigation();
    const t = useTranslate();
    const {dataGridProps, search, filters, sorter} = useDataGrid<
        IBookingTransport,
        HttpError,
        IBookingTransportFilterVariables>({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {
                q,
                organization,
                subunit,
                transport,
                startDate,
                allDay,
                is_active
            } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });

            filters.push({
                field: "organization__id__in",
                operator: "eq",
                value: (organization ?? [].length) > 0 ? organization : undefined,
            });

            filters.push({
                field: "subunit__id__in",
                operator: "eq",
                value: subunit,//(subunit ?? [].length) > 0 ? subunit : undefined,
            });

            filters.push({
                field: "transport__id__in",
                operator: "eq",
                value: transport//(transport ?? [].length) > 0 ? transport : undefined,
            });

            filters.push({
                field: "allDay",
                operator: "eq",
                value: allDay !== "" ? allDay : undefined,
            });

            filters.push({
                    field: "startDate_gte",
                    operator: "eq",
                    value: startDate?.["0"] !== undefined
                        ? moment(`${startDate?.["0"]} 00:00:00`, 'DD.MM.YYYY HH:mm:ss')
                            .format('YYYY-MM-DD HH:mm:ss')
                        : undefined,
                },
                {
                    field: "startDate_lte",
                    operator: "eq",
                    value: startDate?.["1"] !== undefined
                        ? moment(`${startDate?.["1"]} 23:59:59`, 'DD.MM.YYYY HH:mm:ss')
                            .format('YYYY-MM-DD HH:mm:ss')
                        : undefined,
                },);

            filters.push({
                field: "is_active",
                operator: "eq",
                value: is_active !== "" ? is_active : undefined,
            });
            return filters;
        },
        initialSorter: [
            {
                field: "startDate",
                order: "desc",
            },
        ],

    });

    // const {
    //   queryResult,
    //  } = useSelect<IBookingTransport>({
    //    resource: "booking_transport",
    //
    //    hasPagination: false,
    // });

    const columns = React.useMemo<GridColumns<IBookingTransport>>(
        () => [
            {
                field: "is_active",
                headerName: t("booking_transport.fields.is_active"),
                align: "center",
                headerAlign: "center",
                flex: 0.5,
                renderCell: function render({row}) {
                    return (
                        <ItemStatus
                            svgIconProps={{
                                sx: {width: "16px", height: "16px"},
                            }}
                            value={row.is_active}
                        />
                    );
                },
            },
            {
                field: "startDate",
                headerAlign: "center",
                headerName: t("booking_transport.fields.startDate"),
                align: "center",
                minWidth: 150,
                flex: 0.5,
                renderCell: function render({row}) {
                    return (
                        row.is_active === false ?
                            <s><DateField value={row.startDate} format={"DD.MM.YYYY (HH:mm)"}/></s> :
                            <DateField value={row.startDate} format={"DD.MM.YYYY (HH:mm)"}/>
                    );
                },
            },
            {
                field: "title",
                headerName: t("booking_transport.fields.title"),
                minWidth: 150,
                flex: 1,
                renderCell: function render({row}) {
                    return (
                        row.is_active === false ? <s>{row.title}</s> : row.title
                    )
                }
            },
            {
                field: "duration",
                headerAlign: "center",
                headerName: t("booking_transport.fields.duration"),
                align: "center",
                minWidth: 100,
                flex: 0.5,
            },
            // {
            //     field: "allDay",
            //     headerName: t("booking_transport.fields.allDay"),
            //     headerAlign: "center",
            //     align: "center",
            //     flex: 0.5,
            //     renderCell: function render({row}) {
            //         return (
            //             <BooleanField
            //                 svgIconProps={{
            //                     sx: {width: "16px", height: "16px"},
            //                 }}
            //                 value={row.allDay}
            //             />
            //         );
            //     },
            // },
            {
                field: "organization",
                headerName: t("booking_transport.fields.organization"),
                headerAlign: "center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.organization?.title;
                },
            },
            {
                field: "subunit",
                headerName: t("booking_transport.fields.subunit"),
                headerAlign: "center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.subunit?.title;
                },
            },
            {
                field: "count_man",
                headerName: t("booking_transport.fields.count_man"),
                headerAlign: "center",
                align: "center",
                flex: 1,
                // renderCell: function render({row}) {
                //     return row.subunit?.title
                // },
            },
            {
                field: "transport",
                headerName: t("booking_transport.fields.transport"),
                headerAlign: "center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.transport?.title;
                },
            },
            {
                field: "actions",
                type: "actions",
                sortable: false,
                headerName: t("table.actions"),
                renderCell: function render({row}) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id}/>
                            {/*<ShowButton hideText recordItemId={row.id}/>*/}
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 10,
                flex: 0.5,
            },
        ],
        [t]
    );


    const {register, handleSubmit, control} = useForm<BaseRecord,
        HttpError,
        IBookingTransportFilterVariables>({
        defaultValues: {
            q: getDefaultFilter("q", filters, "eq"),
            organization: getDefaultFilter("organization.id", filters, "eq"),
            transport: getDefaultFilter("transport.id", filters, "eq"),
            subunit: getDefaultFilter("subunit.id", filters, "eq"),
            // startDate: [
            //     getDefaultFilter("startDate_gte", filters, "eq"),
            //     getDefaultFilter("startDate_lte", filters, "eq", ),
            // ],
        },
    });

    const {autocompleteProps: organizationAutocompleteProps} = useAutocomplete({
        resource: "organizations",
        sort: [{field: "id", order: "asc"}],
        defaultValue: getDefaultFilter("organization.id", filters, "eq"),
        onSearch: (value) => {
            const filters: CrudFilters = [];
            filters.push({
                field: "q",
                operator: "eq",
                value: value.length > 0 ? value : undefined,
            });
            return filters;
        },
    });

    const {autocompleteProps: subunitAutocompleteProps} = useAutocomplete({
        resource: "subunits",
        sort: [{field: "organization_id", order: "asc"}],
        defaultValue: getDefaultFilter("subunit.id", filters, "eq"),
        onSearch: (value) => {
            const filters: CrudFilters = [];
            filters.push({
                field: "q",
                operator: "eq",
                value: value.length > 0 ? value : undefined,
            });
            return filters;
        },
    });

    const {autocompleteProps: transportAutocompleteProps} = useAutocomplete({
        resource: "transports",
        sort: [{field: "title", order: "asc"}],
        defaultValue: getDefaultFilter("transport.id", filters, "eq"),
        onSearch: (value) => {
            const filters: CrudFilters = [];
            filters.push({
                field: "q",
                operator: "eq",
                value: value.length > 0 ? value : undefined,
            });
            return filters;
        },
    });

    return (
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
            <Grid item xs={12} lg={5.5}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
                    <CalendarShow url={`${API_URL}/booking_transport`} />
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
2
                </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
                    <CardHeader title={t("filter.title")}/>
                    <CardContent sx={{pt: 0}}>
                        <Box
                            component="form"
                            sx={{display: "flex", flexDirection: "column"}}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("booking_transport.filter.search.label")}
                                placeholder={t("booking_transport.filter.search.placeholder")}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                            />
                            <Controller
                                control={control}
                                name="organization"
                                //defaultValue={null}
                                render={({field}) => (
                                    <Autocomplete
                                        {...organizationAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?.id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return (
                                                organizationAutocompleteProps?.options?.find(
                                                    (p) => p.id.toString() === item.id.toString()
                                                )?.title ?? ""
                                            );
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            return (
                                                option.id.toString() === value.id?.toString() ||
                                                option.id.toString() === value.toString()
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t("booking_transport.filter.organization.label")}
                                                placeholder={t(
                                                    "booking_transport.filter.organization.placeholder"
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="subunit"
                                render={({field}) => (
                                    <Autocomplete
                                        {...subunitAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?.id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return (
                                                subunitAutocompleteProps?.options?.find(
                                                    (p) => p.id.toString() === item.id.toString()
                                                )?.title ?? ""
                                            );
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            return (
                                                option.id.toString() === value.id?.toString() ||
                                                option.id.toString() === value.toString()
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t("booking_transport.filter.subuinit.label")}
                                                placeholder={t(
                                                    "booking_transport.filter.subuinit.placeholder"
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="transport"
                                //defaultValue={null}
                                render={({field}) => (
                                    <Autocomplete
                                        {...transportAutocompleteProps}
                                        {...field}
                                        onChange={(_, value) => {
                                            field.onChange(value?.id ?? value);
                                        }}
                                        getOptionLabel={(item) => {
                                            return (
                                                transportAutocompleteProps?.options?.find(
                                                    (p) => p.id.toString() === item.id.toString()
                                                )?.title ?? ""
                                            );
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            return (
                                                option.id.toString() === value.id?.toString() ||
                                                option.id.toString() === value.toString()
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t("booking_transport.filter.transport.label")}
                                                placeholder={t(
                                                    "booking_transport.filter.transport.placeholder"
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            <Controller
                                control={control}
                                name="is_active"
                                render={({field}) => (
                                    <FormControl margin="normal" size="small">
                                        <InputLabel id="isActive-select">
                                            {t("booking_transport.filter.is_active.label")}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="isActive-select"
                                            label={t("booking_transport.filter.is_active.label")}
                                        >
                                            <MenuItem value="">
                                                <em>{t("booking_transport.filter.is_active.none")}</em>
                                            </MenuItem>
                                            <MenuItem value="true">
                                                {t("booking_transport.filter.is_active.true")}
                                            </MenuItem>
                                            <MenuItem value="false">
                                                {t("booking_transport.filter.is_active.false")}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />


                            <Controller
                                control={control}
                                name="startDate"
                                render={({field: {onChange, name, value},}) => (
                                    <>
                                        <DatePicker
                                            value={value}
                                            onChange={(startDate) => {
                                                onChange(startDate?.valueOf() ? startDate : ["", ""]);
                                            }}
                                            locale={locale_ru}
                                            format={"DD.MM.YYYY"}
                                            range
                                            render={
                                                <CustomRangeInput
                                                    openCalendar
                                                    value={value}
                                                    handleValueChange
                                                    label={t("booking_transport.filter.rangeDate")}
                                                />
                                            }
                                            numberOfMonths={2}
                                            plugins={[
                                                <Footer
                                                    position="bottom"
                                                    format={"DD.MM.YYYY"}
                                                    names={{
                                                        selectedDates: "Период:",
                                                        from: "с:",
                                                        to: "по:",
                                                        selectDate: "Выберите период",
                                                        close: "Закрыть",
                                                        separator: "-",
                                                    }}
                                                />,
                                                weekends([0, 6])
                                            ]}
                                        />
                                    </>
                                )}
                            />
                            <br/>
                            <Button type="submit" variant="contained">
                                {t("subunits.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={12} lg={9}>
                <List>
                    <DataGrid
                        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                        {...dataGridProps}
                        columns={columns}
                        filterModel={undefined}
                        // calendar={{
                        //     Toolbar: GridToolbar,
                        // }}
                        autoHeight
                        sx={{
                            "& .MuiDataGrid-cell:hover": {
                                cursor: "pointer",
                            },
                        }}
                        onRowClick={(row) => {
                            show("booking_transport", row.id);
                        }}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
