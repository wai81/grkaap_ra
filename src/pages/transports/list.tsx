import {useNavigation, useTranslate} from "@pankod/refine-core";
//import {MuiInferencer} from "@pankod/refine-inferencer/mui";
import {BooleanField, DataGrid, EditButton, GridColumns, List, ruRU, useDataGrid} from "@pankod/refine-mui";
import React from "react";

import {ITransport} from "../../interfaces/ITransport";

export const TransportList = () => {
    const {show} = useNavigation();
    const t = useTranslate();
    const {dataGridProps} = useDataGrid();
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
                        <BooleanField
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
                minWidth: 150,
                flex: 1,
            },
            {
                field: 'details',
                headerName: t('transports.fields.details'),
                minWidth: 500,
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
                    show("transports", row.id);
                }}
            />
        </List>)
};
