import React from 'react';
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
} from '@pankod/refine-mui';
import { useMany } from '@pankod/refine-core';

export const UserList = () => {
  const { dataGridProps } = useDataGrid();

  const { data: organizationData, isLoading: organizationIsLoading } = useMany({
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
        headerName: 'Last Name',
        minWidth: 200,
      },
      {
        field: 'first_name',
        headerName: 'First Name',
        minWidth: 200,
      },
      {
        field: 'patronymic',
        headerName: 'Patronymic',
        minWidth: 200,
      },
      {
        field: 'organization',
        headerName: 'Organization',
        valueGetter: ({ row }) => {
          const value = row?.organization?.name;

          return value;
        },
        minWidth: 200,
        // renderCell: function render({ value }) {
        //   return organizationIsLoading ? (
        //     <>Loading...</>
        //   ) : (
        //     organizationData?.data?.find((item) => item.id === value)?.name
        //   );
        // },
      },
      {
        field: 'is_superuser',
        headerName: 'Is Superuser',
        minWidth: 50,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: 'is_active',
        headerName: 'Is Active',
        minWidth: 50,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },
      {
        field: 'username',
        headerName: 'Username',
        minWidth: 200,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        minWidth: 80,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
