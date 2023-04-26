import {useTranslation} from "react-i18next";
import {
    Autocomplete, Avatar,
    Box, Button,
    Card,
    CardContent,
    CardHeader, Chip, Dialog,
    FormControl,
    Grid,
    InputLabel, MenuItem, Select,
    Stack,
    TextField, Typography
} from "@mui/material";
import CalendarShow from "../../components/calendar/CalendarShow";
import {API_URL} from "../../constants";
import React, {useState} from "react";
import {Controller} from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import locale_ru from "../../components/multiDatePicer/locale_ru";
import CustomRangeInput from "../../components/multiDatePicer/customRangeInput";
import Footer from "react-multi-date-picker/plugins/range_picker_footer";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import moment from "moment";
import {
    IBookingTransport,
    IBookingTransportFilterVariables,
    ICreateBookingTransport, IUpdateBookingTransport
} from "../../interfaces/IBookingTransport";
import {CreateButton, DateField, EditButton, List, MarkdownField, useAutocomplete, useDataGrid} from "@refinedev/mui";
import {BaseRecord, CrudFilters, getDefaultFilter, HttpError, useApiUrl, useList} from "@refinedev/core";
import {useForm, useModalForm} from "@refinedev/react-hook-form";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {ItemStatus} from "../../components/itemStatus";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import {PdfLayoutListBookingTransport} from "../../components/pdf";
import {CreateBookingTransportDrawer, EditBookingTransportDrawer} from "../../components/booking_transports";

export const DashboardBookingTransport: React.FC = () => {
    const {t} = useTranslation();
    const startDay = moment().clone().startOf('month').startOf('week');
    const [records, setRecords] = useState<IBookingTransport[] | undefined>(undefined);


    const {dataGridProps, search, filters,} = useDataGrid<IBookingTransport,
        HttpError,
        IBookingTransportFilterVariables>({
        resource: "booking_transport",
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
                        : startDay.clone().format('YYYY-MM-DD hh:mm:ss'),

                },
                {
                    field: "startDate_lte",
                    operator: "eq",
                    value: startDate?.["1"] !== undefined
                        ? moment(`${startDate?.["1"]} 23:59:59`, 'DD.MM.YYYY HH:mm:ss')
                            .format('YYYY-MM-DD HH:mm:ss')
                        : startDay.clone().add(42, 'day').format('YYYY-MM-DD hh:mm:ss')
                },);

            filters.push({
                field: "is_active",
                operator: "eq",
                value: is_active !== "" ? is_active : undefined,
            });
            return filters;
        },

        pagination: {
            pageSize: 10
        },

        filters: {
            initial: [
                {
                    field: "startDate_gte",
                    operator: "eq",
                    value: moment().startOf('month').format('YYYY-MM-DD hh:mm:ss'),//startDay.format('YYYY-MM-DD hh:mm:ss'),
                },
                {
                    field: "startDate_lte",
                    operator: "eq",
                    value: moment().endOf('month').format('YYYY-MM-DD hh:mm:ss'),//startDay.clone().add(42, 'day').format('YYYY-MM-DD hh:mm:ss')
                },
            ]
        },

        sorters: {
            initial: [
                {
                    field: "startDate",
                    order: "desc",
                },
            ]
        }
    });


    const {data} = useList<IBookingTransport, HttpError>({
        resource: "booking_transport",

        pagination: {
            pageSize: 100,
        },

        filters: filters,

        sorters: [{
            field: "startDate",
            order: "desc",
        }]
    })
    const bookingList = data?.data ?? [];

    const createDrawerFormProps = useModalForm<ICreateBookingTransport, HttpError>({
        refineCoreProps: {
            resource: "booking_transport",
            action: "create",
            redirect: false,
        },
        modalProps: {
            autoResetForm: true,
        },
    });

    const {
        modal: {show: showCreateDrawer},
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IUpdateBookingTransport, HttpError>({
        refineCoreProps: {
            resource: "booking_transport",
            action: "edit",
            redirect: false,
        },
    });
    const {
        modal: {show: showEditDrawer},
    } = editDrawerFormProps;

    const apiUrl = useApiUrl();

    const columns = React.useMemo<GridColumns<IBookingTransport>>(
        () => [
            {
                field: "is_active",
                headerName: t("booking_transport.fields.is_active"),
                align: "center",
                headerAlign: "center",
                flex: 0.3,
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
                flex: 0.7,
                renderCell: function render({row}) {
                    return (
                        !row.is_active ?
                            <s><DateField value={row.startDate} format={"DD.MM.YYYY (HH:mm)"}/></s> :
                            <DateField value={row.startDate} format={"DD.MM.YYYY (HH:mm)"}/>
                    );
                },
            },
            {
                field: "title",
                headerName: t("booking_transport.fields.title"),
                minWidth: 100,
                flex: 2,
                // renderCell: function render({row}) {
                //     return (
                //         !row.is_active ? <s>{row.title}</s> : row.title
                //     )
                // }
                renderCell: function render({row}) {
                    return (<div>
                            <Typography>
                                {!row.is_active ? <s>{row.title}</s> : <>{row.title}</>}
                            </Typography>
                            <Typography variant={"body2"}>
                                <Chip
                                    //size="small"
                                    variant="outlined"
                                    color={"primary"}
                                    sx={{
                                        height: 'auto',
                                        '& .MuiChip-label': {
                                            display: 'block',
                                            whiteSpace: 'normal',
                                        },
                                    }}
                                    //avatar={<Avatar><GroupsIcon/></Avatar>}
                                    label={`${row.count_man} чел. ${row.subunit?.title}`}/>
                            </Typography>
                            <Typography color={'textSecondary'} variant={"caption"} title={row.subunit?.title}>
                                {row.description}
                            </Typography>
                        </div>
                    );
                }
            },
            {
                field: "duration",
                headerAlign: "center",
                headerName: t("booking_transport.fields.duration"),
                align: "center",
                minWidth: 60,
                flex: 0.2,
                renderCell: function render({row}) {
                    return (`${row.duration} ч.`)
                }
            },
            // {
            //     field: "subunit",
            //     headerName: t("booking_transport.fields.subunit"),
            //     headerAlign: "center",
            //     align: "left",
            //     flex: 2,
            //     renderCell: function render({row}) {
            //         return <Typography noWrap variant={"body2"} title={row.subunit?.title}>
            //             {row.subunit?.title}
            //         </Typography>;
            //     },
            // },
            // {
            //     field: "count_man",
            //     headerName: t("booking_transport.fields.count_man"),
            //     headerAlign: "center",
            //     align: "center",
            //     flex: 1,
            //     renderCell: function render({row}) {
            //         return <Chip avatar={<Avatar><GroupsIcon/></Avatar>} label={row.count_man}  />
            //     },
            // },
            {
                field: "transport",
                headerName: t("booking_transport.fields.transport"),
                headerAlign: "center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {

                    return (row.transport !== null ?<div>
                        <Chip avatar={<Avatar
                            src={`${apiUrl}/${row.transport?.image_url}`}
                            sx={{
                                cursor: "pointer",
                                width: {
                                    xs: 40,
                                    md: 70,
                                },
                                height: {
                                    xs: 20,
                                    md: 50,
                                },
                                //borderRadius:1
                            }}
                            alt={row.transport?.title}
                        />}
                              label={<MarkdownField value={row.transport?.title}/>}
                                                           title={row.transport?.title} />
                          <Typography variant={"caption"}>{t("booking_transport.fields.driver")}: {row.transport?.description}</Typography>
                        </div>
                        : '')
                        ;
                },
            },
            {
                field: "creator",
                headerName: t("booking_transport.fields.creator"),
                headerAlign: "center",
                align: "center",
                flex: 0.5,
                renderCell: function render({row}) {
                    if (row.creator?.id === undefined) {
                        return " "
                    } else {
                        return (<Avatar
                            alt={`${row.creator?.last_name} ${row.creator?.first_name}`}
                            src={`${apiUrl}/${row.creator?.avatar}`}
                            title={`${row.creator?.last_name} ${row.creator?.first_name}`}
                        />)
                    }
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
                            <EditButton hideText
                                        onClick={() => showEditDrawer(row.id)}
                            />
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

        sorters: [{field: "id", order: "asc"}]
    });

    const {autocompleteProps: subunitAutocompleteProps} = useAutocomplete({
        resource: "subunits",
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

        sorters: [{field: "organization_id", order: "asc"}]
    });

    const {autocompleteProps: transportAutocompleteProps} = useAutocomplete({
        resource: "transports",
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

        sorters: [{field: "title", order: "asc"}]
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container columnSpacing={{xs: 1, sm: 1, md: 1}} spacing={1}>
            <CreateBookingTransportDrawer {...createDrawerFormProps} />
            <EditBookingTransportDrawer {...editDrawerFormProps} />
            <Grid item xs={12} lg={5.5}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
                    <CalendarShow url={`${API_URL}/booking_transport`}/>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6.5}>
                <Grid container columnSpacing={{xs: 1, sm: 1, md: 1}} spacing={1}>
                    <Grid item xs={12} lg={12} paddingY={1}>
                        <Card sx={{paddingX: {xs: 2, md: 0}}}>
                            <CardHeader title={t("filter.title")}/>
                            <CardContent sx={{pt: 0}}>
                                <Box
                                    component="form"
                                    sx={{display: "flex", flexDirection: "column"}}
                                    autoComplete="off"
                                    onSubmit={handleSubmit(search)}
                                >
                                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 1, sm: 1, md: 1}}>
                                        <TextField
                                            {...register("q")}
                                            label={t("booking_transport.filter.search.label")}
                                            placeholder={t("booking_transport.filter.search.placeholder")}
                                            margin="dense"
                                            //fullWidth
                                            autoFocus
                                            size="small"
                                            sx={{width: '40%', paddingX: 0.5}}
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
                                                                margin="dense"
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
                                                            margin="dense"
                                                            variant="outlined"
                                                            size="small"

                                                        />
                                                    )}
                                                    sx={{width: '40%', paddingX: 0.5}}
                                                />
                                            )}
                                        />
                                    </Stack>
                                    <Stack direction={{xs: 'column', sm: 'row'}}
                                           justifyContent="flex-start"
                                           alignItems="flex-start">
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
                                                            label={t("booking_transport.filter.subunit.label")}
                                                            placeholder={t(
                                                                "booking_transport.filter.subunit.placeholder"
                                                            )}
                                                            margin="dense"
                                                            variant="outlined"
                                                            size="small"

                                                        />
                                                    )}
                                                    sx={{width: '40%', paddingX: 0.5}}
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
                                                            margin="dense"
                                                            variant="outlined"
                                                            size="small"

                                                        />
                                                    )}
                                                    sx={{width: '40%', paddingX: 0.5}}
                                                />
                                            )}
                                        />
                                        <Controller
                                            control={control}
                                            name="is_active"
                                            render={({field}) => (
                                                <FormControl margin="dense" size="small"
                                                             sx={{width: '40%', paddingX: 0.5}}>
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
                                    </Stack>
                                    <br/>
                                    <Button type="submit" variant="contained">
                                        {t("subunits.filter.submit")}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={12}>
                        <List
                            // createButtonProps={
                            // { onClick: () => showCreateDrawer()}}
                            headerButtons={() => (
                                <>
                                    <Button
                                        title={'Печать'}
                                        startIcon={<LocalPrintshopOutlinedIcon/>}
                                        onClick={() => {
                                            setRecords(bookingList);
                                            handleOpen();
                                        }}
                                        variant={"outlined"}
                                    >
                                        Печать
                                    </Button>
                                    <CreateButton onClick={() => showCreateDrawer()}/>
                                </>
                            )}
                        >
                            <DataGrid
                                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                                {...dataGridProps}
                                columns={columns}
                                filterModel={undefined}
                                disableColumnMenu={true}
                                getRowHeight={() => 'auto'}
                                autoHeight
                                sx={{
                                    "& .MuiDataGrid-cell": {padding: '8px',},
                                    "& .MuiDataGrid-cell:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                                //components={{Toolbar: GridToolbar,}}
                                rowsPerPageOptions={[5, 10, 20, 30, 100]}
                                onRowClick={(row) => {
                                    showEditDrawer(row.id)
                                    //show("booking_transport", row.id);
                                }}
                            />
                        </List>
                        <Dialog fullWidth={true} maxWidth={false} open={open} onClose={handleClose}>
                            <PdfLayoutListBookingTransport records={bookingList}/>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};