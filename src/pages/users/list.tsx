import React from 'react';
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    List,
    Checkbox,
    DateField,
} from '@pankod/refine-mui';
import {useTranslate, useMany, useNavigation} from '@pankod/refine-core';


export const UserList = () => {
    const {show, edit} = useNavigation();
    const t = useTranslate();
    const {dataGridProps} = useDataGrid();

    const {data: organizationData, isLoading: organizationIsLoading} = useMany({
        resource: 'organizations',
        ids: dataGridProps?.rows?.map((item: any) => item?.organizations?.id) ?? [],
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: 'last_name',
                headerName: t('users.fields.last_name'),
                flex: 1,
                minWidth: 150,
            },
            {
                field: 'first_name',
                headerName: t('users.fields.first_name'),
                flex: 1,
                minWidth: 150,
            },
            {
                field: 'patronymic',
                headerName: t('users.fields.patronymic'),
                flex: 1,
                minWidth: 150,
            },
            {
                field: 'organization',
                headerName: t('users.fields.organization.title'),
                flex: 1,
                valueGetter: ({row}) => {
                    const value = row?.organization?.name;
                    return value;
                },
                minWidth: 150,
                sortable: false,
                renderCell: function render({ value }) {
                  return organizationIsLoading ? (
                    <>Loading...</>
                  ) : (
                    organizationData?.data?.find((item) => item.id === value)?.name
                  );
                },
            },
            {
                field: 'is_superuser',
                headerName: 'Is Superuser',
                flex: 1,
                minWidth: 50,
                renderCell: function render({value}) {
                    return <Checkbox checked={!!value}/>;
                },
            },
            {
                field: 'is_active',
                headerName: 'Is Active',
                flex: 1,
                minWidth: 50,
                renderCell: function render({value}) {
                    return <Checkbox checked={!!value}/>;
                },
            },
            {
                field: 'username',
                headerName: t('users.fields.username'),
                flex: 1,
                minWidth: 200,
            },
            {
                field: 'created_at',
                headerName: t('users.fields.created_at'),
                flex: 1,
                minWidth: 80,
                renderCell: function render({value}) {
                    return <DateField value={value}/>;
                },
            },
            {
                field: 'actions',
                type: "actions",
                sortable: false,
                headerName: t('table.actions'), //'Actions',
                flex: 1,
                minWidth: 100,
                // getActions: ({id}) => [
                //     // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
                //     <GridActionsCellItem
                //         key={1}
                //         sx={{padding: "2px 6px"}}
                //         label={t('buttons.edit')}
                //         icon={<Edit color="success"/>}
                //         onClick={() => edit("users", row.id)}
                //         showInMenu
                //     />
                // ],
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
                    show("users", row.id);
                }}
            />
        </List>
    );
};
