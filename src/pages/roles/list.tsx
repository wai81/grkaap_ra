import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import React from "react";
import {useMany, useNavigation, useTranslate} from "@refinedev/core";
import {DateField, EditButton, List, useDataGrid} from "@refinedev/mui";

import { DataGrid, ruRU, GridColumns } from "@mui/x-data-grid";
import {IRole} from "../../interfaces/IRole";
import {IUser} from "../../interfaces/IUser";

export const RoleList = () => {
    const { show } = useNavigation();
    const t = useTranslate()
    const { dataGridProps } = useDataGrid<IRole>()

    const userIds = dataGridProps?.rows.map((item)=> item.creator_id);
    const { data: usersData, isLoading } = useMany<IUser>({
        resource: "users",
        ids: userIds,
        // queryOptions:{
        //     enabled: userIds.length > 0,
        // }
    })

    const columns = React.useMemo<GridColumns<IRole>>(
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
                headerName: t("admin/roles.fields.name"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "role_key",
                headerName: t("admin/roles.fields.role_key"),
                headerAlign: "center",
                flex: 1,
            },
            {
                field: "description",
                headerName: t("admin/roles.fields.description"),
                headerAlign: "center",
                flex: 2,
            },
            {
                field: "created_at",
                headerName: t("admin/roles.fields.created_at"),
                headerAlign: "center",
                flex: 0.5,
                minWidth: 80,
                renderCell: function render({ row }) {
                    return <DateField value={row.created_at} format={"DD.MM.YYYY"} />;
                },
            },
            {
                field: "creator_id",
                headerName: t("admin/roles.fields.creator_id"),
                headerAlign: "center",
                flex: 1,
                renderCell: function render({row}){
                    if (isLoading) {
                        return "Загрузка...";
                    }
                    const user = usersData?.data.find(
                        (item) => item.id === row.creator_id,
                    );
                    return user?.username
                },
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
        [t],
    );
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={2}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={t("filter.title")} />
                    <CardContent sx={{ pt: 0 }}>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={10}>
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
            </Grid>
        </Grid>
    )
}