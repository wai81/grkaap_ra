import { DataGrid, GridColumns, ruRU } from "@mui/x-data-grid";
import { IResourceComponentsProps, GetListResponse, useTranslate } from "@refinedev/core";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { EditButton, List, useDataGrid } from "@refinedev/mui";
import { ICasbinObject } from "interfaces/ICasbinObjects";
import { useMemo } from "react";

export const CasbinObjectsList = () => {
    const t = useTranslate()
    const { dataGridProps } = useDataGrid()
    const columns = useMemo<GridColumns<ICasbinObject>>(
        ()=>[
            {
                field: "id",
                type: "number",
                align: "center",
                headerAlign: "center",
                flex: 0.2,
            },
            {
                field: "name",
                headerName: t("admin/objects.fields.name"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "object_key",
                headerName: t("admin/objects.fields.object_key"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "description",
                headerName: t("admin/objects.fields.description"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "creator_id",
                headerName: t("admin/objects.fields.creator_id"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "actions",
                type: "actions",
                sortable: false,
                headerName: t("table.actions"), //'Actions',
                flex: 0.5,
                minWidth: 100,
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
            },
        ],
        [t]
    )
    return (
    <List>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        {...dataGridProps}
        columns={columns}
        filterModel={undefined}
        autoHeight
        disableColumnMenu={true}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            cursor: "pointer",
          },
        }}
      />
    </List>
    )
};
