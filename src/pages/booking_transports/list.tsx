import {useNavigation, useSelect, useTranslate} from "@pankod/refine-core";
//import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import {BooleanField, DataGrid, DateField, EditButton, GridColumns, GridToolbar, List, ruRU, useDataGrid} from "@pankod/refine-mui";
import { ItemStatus } from "components/itemStatus";
import React from "react";
import {IBookingTransport} from "../../interfaces/IBookingTransport";
import {IOrganization} from "../../interfaces/IOrganization";

export const Booking_transportList = () => {
    const {show, edit} = useNavigation();
    const t = useTranslate();
    const {dataGridProps}=useDataGrid<IBookingTransport>();

    const {
        options,
        queryResult: { isLoading },
    } = useSelect<IOrganization>({
        resource: "organizations",
        hasPagination: false,
    });

    const columns = React.useMemo<GridColumns<IBookingTransport>>(
        ()=>[
            {
                field: "is_active",
                headerName: t('booking_transport.fields.is_active'),
                align: "center",
                headerAlign: "center",
                flex: 0.5,
                renderCell: function render({ row }) {
                    return (
                        <ItemStatus
                            svgIconProps={{
                                sx: { width: "16px", height: "16px" },
                            }}
                            value={row.is_active}
                        />
                    );
                },
            },
            {
                field: 'startDate',
                headerAlign:"center",
                headerName: t('booking_transport.fields.startDate'),
                align: "center",
                minWidth: 150,
                flex: 0.5,
                renderCell: function render({value}) {
                    return <DateField value={value} format={"DD.MM.YYYY (HH:mm)"}/>;
                },
            },
            {
                field: 'title',

                headerName: t('booking_transport.fields.title'),
                minWidth: 150,
                flex:1,
            },
            {
                field: 'endDate',
                headerAlign:"center",
                headerName: t('booking_transport.fields.endDate'),
                align: "center",
                minWidth: 150,
                flex: 0.5,
                renderCell: function render({value}) {
                    return <DateField value={value} format={"DD.MM.YYYY (HH:mm)"}/>;
                },
            },
            {
                field: 'allDay',
                headerName: t('booking_transport.fields.allDay'),
                headerAlign:"center",
                align: "center",
                flex: 0.5,
                renderCell: function render({row}) {
                    return <BooleanField
                    svgIconProps={{
                        sx: { width: "16px", height: "16px" },
                    }}
                        value={row.allDay}/>;
                },
            },
            {
                field: 'organization',
                headerName: t('booking_transport.fields.organization'),
                headerAlign:"center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.organization?.title
                },
            },
            {
                field: 'subunit',
                headerName: t('booking_transport.fields.subunit'),
                headerAlign:"center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.subunit?.title
                },
            },
            {
                field: 'count_man',
                headerName: t('booking_transport.fields.count_man'),
                headerAlign:"center",
                align: "center",
                flex: 1,
                // renderCell: function render({row}) {
                //     return row.subunit?.title
                // },
            },
            {
                field: 'transport',
                headerName: t('booking_transport.fields.transport'),
                headerAlign:"center",
                align: "left",
                flex: 1,
                renderCell: function render({row}) {
                    return row.transport?.title
                },
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
        [options, isLoading],
    );

    return (
        <List>
        <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            {...dataGridProps}
            columns={columns}
            // components={{
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
    </List>);
};
