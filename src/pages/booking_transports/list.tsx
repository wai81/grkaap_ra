import {useNavigation, useTranslate} from "@pankod/refine-core";
//import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import {BooleanField, DataGrid, DateField, EditButton, GridColumns, List, ruRU, useDataGrid} from "@pankod/refine-mui";
import React from "react";

export const Booking_transportList= () => {
    const {show, edit} = useNavigation();
    const t = useTranslate();
    const {dataGridProps}=useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        ()=>[

            {
                field: 'title',

                headerName: t('booking_transport.fields.title'),
                minWidth: 150,
                flex:1,
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
                        value={row.is_active}/>;
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
        [t]
    );

    return (
        <List>
        <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            {...dataGridProps}
            columns={columns}
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
