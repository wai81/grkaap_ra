import React from 'react';
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DateField,
} from '@pankod/refine-mui';
import { useTranslate } from '@pankod/refine-core';

export const OrganizationList = () => {
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      {
        field: 'id',
        headerName: 'Id',
        type: 'number',
        minWidth: 50,
      },
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 200,
      },
      {
        field: 'fullname',
        headerName: 'Fullname',
        minWidth: 300,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        minWidth: 100,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: 'actions',
        headerName: t('table.actions'),
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
