import {BaseRecord, CrudFilters, getDefaultFilter, HttpError, useNavigation, useTranslate} from "@pankod/refine-core";
//import {MuiInferencer} from "@pankod/refine-inferencer/mui";
import {
    BooleanField, Box, Button,
    Card, CardContent,
    CardHeader,
    DataGrid,
    EditButton, FormControl,
    Grid,
    GridColumns, InputLabel,
    List, MenuItem,
    ruRU, Select, TextField,
    useDataGrid
} from "@pankod/refine-mui";
import React from "react";

import {ITransport} from "../../interfaces/ITransport";
import {IBookingTransportFilterVariables} from "../../interfaces/IBookingTransport";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {ISubunitFilterVariables} from "../../interfaces/ISubunit";
import { ItemStatus } from "components/itemStatus";

export const TransportList = () => {
    const {show} = useNavigation();
    const t = useTranslate();
    const {dataGridProps, search, filters} = useDataGrid<ITransport,
        HttpError,
        IBookingTransportFilterVariables>({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const {q, is_active} = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });
            filters.push({
                field: "is_active",
                operator: "eq",
                value: is_active !== "" ? is_active : undefined,
            });
            return filters
        },
        initialSorter: [{
            field: 'title',
            order: 'asc'
        }]
    });
    const columns = React.useMemo<GridColumns<ITransport>>(
        () => [
            {
                field: 'is_active',
                headerName: t('transports.fields.is_active'),
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
                field: 'title',
                headerName: t('transports.fields.title'),
                minWidth: 100,
                flex: 1,
            },
            {
                field: 'details',
                headerName: t('transports.fields.details'),
                minWidth: 200,
                flex: 1,
            },
            {
                field: 'actions',
                type: "actions",
                sortable: false,
                headerName: t('table.actions'),
                renderCell: function render({row}) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id}/>
                            {/*<ShowButton hideText recordItemId={row.id}/>*/}
                        </>
                    );
                },
                align: 'center',
                headerAlign: 'center',
                minWidth: 10,
                flex: 0.5,
            },
        ],
        [t])

    const {register, handleSubmit, control} = useForm<BaseRecord,
        HttpError,
        IBookingTransportFilterVariables>({
        defaultValues: {
            q: getDefaultFilter('q', filters, 'eq'),
        },
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
                                label={t("transports.filter.search.label")}
                                placeholder={t(
                                    "transports.filter.search.placeholder",
                                )}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                            />
                            <Controller
                                control={control}
                                name="is_active"
                                render={({ field }) => (
                                    <FormControl margin="normal" size="small">
                                        <InputLabel id="isActive-select">
                                            {t("transports.filter.is_active.label")}
                                        </InputLabel>
                                        <Select
                                            {...field}
                                            labelId="isActive-select"
                                            label={t(
                                                "transports.filter.is_active.label",
                                            )}
                                        >
                                            <MenuItem value="">
                                                <em>{t(
                                                    "transports.filter.is_active.none",
                                                )}</em>
                                            </MenuItem>
                                            <MenuItem value="true">
                                                {t(
                                                    "transports.filter.is_active.true",
                                                )}
                                            </MenuItem>
                                            <MenuItem value="false">
                                                {t(
                                                    "transports.filter.is_active.false",
                                                )}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {t("transports.filter.submit")}
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
                        show("transports", row.id);
                    }}
                />
            </List>
            </Grid>
        </Grid>
    )
};
