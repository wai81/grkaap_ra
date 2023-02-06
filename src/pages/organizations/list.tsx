import React from 'react';
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    List,
    DateField,
} from '@pankod/refine-mui';
import {useNavigation, useTranslate} from '@pankod/refine-core';

export const OrganizationList = () => {
    const {show, edit} = useNavigation();
    const t = useTranslate();
    const {dataGridProps} = useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: 'id',
                headerName: t('organizations.fields.id'),
                type: 'number',
                minWidth: 5,
                flex:1,
            },
            {
                field: 'name',
                headerName: t('organizations.fields.name'),
                minWidth: 150,
                flex:1,
            },
            {
                field: 'fullname',
                headerName: t('organizations.fields.fullname'),
                minWidth: 500,
                flex:1,
            },
            {
                field: 'created_at',
                headerName:  t('organizations.fields.created_at'),
                minWidth: 50,
                flex:1,
                renderCell: function render({value}) {
                    return <DateField value={value}/>;
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
                minWidth: 100,
                flex:1,
            },
        ],
        []
    );

    return (
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                sx={{
                    "& .MuiDataGrid-cell:hover": {
                        cursor: "pointer",
                    },
                }}
                onRowClick={(row) => {
                    show("organizations", row.id);
                }}
            />
        </List>
    );
};
