import React from "react";
import {
  DataGrid,
  DateField,
  EditButton,
  GridColumns,
  List,
  ruRU,
  useDataGrid,
} from "@pankod/refine-mui";
import { useNavigation, useTranslate } from "@pankod/refine-core";
import { IOrganization } from "../../interfaces/IOrganization";
import { ItemStatus } from "components/itemStatus";

export const OrganizationList = () => {
  const { show } = useNavigation();
  const t = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColumns<IOrganization>>(
    () => [
      {
        field: "is_active",
        headerName: t("organizations.fields.is_active"),
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
        field: "id",
        headerName: t("organizations.fields.id"),
        type: "number",
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
      {
        field: "title",
        headerName: t("organizations.fields.title"),
        minWidth: 150,
        flex: 1,
        renderCell: function render({row}){
          return (
            !row.is_active? <s>{row.title}</s> : row.title
          )
        }
      },
      {
        field: "fullname",
        headerName: t("organizations.fields.fullname"),
        minWidth: 500,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: t("organizations.fields.created_at"),
        minWidth: 10,
        align: "center",
        headerAlign: "center",
        flex: 0.5,
        renderCell: function render({ value }) {
          return <DateField value={value} format={"DD.MM.YYYY"} />;
        },
      },

      {
        field: "actions",
        type: "actions",
        sortable: false,
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
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
          show("organizations", row.id);
        }}
      />
    </List>
  );
};
