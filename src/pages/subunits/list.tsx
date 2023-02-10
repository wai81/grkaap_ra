import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    Checkbox,
    DateField,
    useAutocomplete,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Box,
    TextField,
    Autocomplete,
    Button, ruRU,
} from "@pankod/refine-mui";

import {ISubunit, ISubunitFilterVariables} from "../../interfaces/ISubunit";
import {
    BaseRecord,
    CrudFilters,
    getDefaultFilter,
    HttpError,
    useExport,
    useNavigation,
    useTranslate
} from "@pankod/refine-core";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {IOrganization} from "../../interfaces/IOrganization";

export const SubunitsList = () => {
    //const {show, edit} = useNavigation();
    const t = useTranslate();
    const {dataGridProps, search, filters, sorter} = useDataGrid<ISubunit,
        HttpError,
        ISubunitFilterVariables>({
        //initialPageSize: 10,
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {q, organization} = params;

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

            // filters.push({
            //     field: "is_active",
            //     operator: "in",
            //     value: (is_active ?? []).length > 0 ? is_active : undefined,
            // });
            return filters
        },
        initialSorter: [{
            field: 'name',
            order: 'desc'
        }]
    });

    const columns = React.useMemo<GridColumns<ISubunit>>(
        () => [

            {
                field: "name",
                headerName: "Name",
                minWidth: 100,
                flex: 1,
                filterable: false,
            },
            {
                field: "organization",
                headerName: "Organization",
                valueGetter: ({row}) => row.organization?.name,
                minWidth: 200,
                flex: 1,
                sortable: false,
                filterable: false,
            },
            // {
            //     field: "fullname",
            //     headerName: "Fullname",
            //     minWidth: 200,
            //     flex:1,
            // },
            {
                field: "color_subunit",
                headerName: "Color Subunit",
                minWidth: 50,
                flex: 1,
                filterable: false,
            },
            {
                field: "is_active",
                headerName: "Is Active",
                minWidth: 50,
                flex: 1,
                filterable: false,
                renderCell: function render({value}) {
                    return <Checkbox checked={!!value}/>;
                },
            },
            {
                field: "actions",
                type: "actions",
                headerName: t('table.actions'),
                sortable: false,
                filterable: false,
                renderCell: function render({row}) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id}/>
                            {/*<ShowButton hideText recordItemId={row.id} />*/}
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 50,
                flex: 1,
            },
        ],
        [t],
    );

    const {show} = useNavigation();

    const {isLoading, triggerExport} = useExport<ISubunit>({
        sorter,
        filters,
        pageSize: 100,
        maxItemCount: 100,
        mapData: (item) => {
            return {
                id: item.id,
                name: item.name,
                full_name: item.fullname,
                organization: item.organization.name,
                active: item.is_active,
                created: item.created_at
            }
        }
    });


    const {register, handleSubmit, control} = useForm<
        BaseRecord,
        HttpError,
        ISubunitFilterVariables>({
        defaultValues: {
            q: getDefaultFilter('q', filters, 'eq'),
            organization: getDefaultFilter("organization.id", filters, 'eq')
        },
    });

    const {autocompleteProps: organizationAutocompleteProps} = useAutocomplete({
        resource: "organizations",
        sort: [{field: 'id', order: 'asc'}],
        defaultValue: getDefaultFilter("organization.id", filters, "eq"),
        onSearch : ((value) =>{
            const filters: CrudFilters = [];
            filters.push({
                field: "q",
                operator: "eq",
                value: (value.length) > 0 ? value : undefined,
            });
            return filters
        })
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
                    <CardHeader title={t("filter.title")}/>
                    <CardContent sx={{pt: 0}}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("subunits.filter.search.label")}
                                placeholder={t(
                                    "subunits.filter.search.placeholder",
                                )}
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
                                            return (organizationAutocompleteProps?.options?.find(
                                                (p) =>
                                                    p.id.toString() ===
                                                    item.id.toString(),
                                            )?.name ?? "");
                                        }}
                                        isOptionEqualToValue={(option, value,) => {
                                            return (
                                                option.id.toString() === value.id?.toString() ||
                                                option.id.toString() === value.toString()
                                            );
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={t(
                                                    "subunits.filter.organization.label",
                                                )}
                                                placeholder={t(
                                                    "subunits.filter.organization.placeholder",
                                                )}
                                                margin="normal"
                                                variant="outlined"
                                                size="small"
                                            />
                                        )}
                                    />
                                )}
                            />
                            {/*<Controller/>*/}
                            <br />
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
                        autoHeight
                        sx={{
                            "& .MuiDataGrid-cell:hover": {
                                cursor: "pointer",
                            },
                        }}
                        onRowClick={(row) => {
                            show("subunits", row.id)
                        }}
                    />
                </List>
            </Grid>
        </Grid>
    );
};
