import { DataGrid, GridColumns, ruRU } from "@mui/x-data-grid";
import {
    IResourceComponentsProps,
    GetListResponse,
    useTranslate,
    useMany,
    useApiUrl,
    HttpError,
    CrudFilters, BaseRecord, getDefaultFilter
} from "@refinedev/core";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { EditButton, List, useDataGrid } from "@refinedev/mui";
import {
    ICasbinObject,
    ICasbinObjectCreate,
    ICasbinObjectFilterVariables,
    ICasbinObjectUpdate
} from "interfaces/ICasbinObjects";
import React, { useMemo } from "react";
import {Avatar, Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography} from "@mui/material";
import {IUser} from "../../interfaces/IUser";
import {useForm, useModalForm} from "@refinedev/react-hook-form";
import {CreateResourcesAppDrawer, EditResourcesAppDrawer} from "../../components/casbinobjects";


export const CasbinObjectsList = () => {
    const t = useTranslate()
    const { dataGridProps, search, filters } = useDataGrid<
        ICasbinObject,
        HttpError,
        ICasbinObjectFilterVariables
        >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q } = params;

            filters.push({
                field: "q",
                operator: "eq",
                value: q !== "" ? q : undefined,
            });

            return filters;
        },

        sorters: {
            initial: [
                {
                    field: "name",
                    order: "asc",
                },
            ]
        }
    });

    const userIds = dataGridProps?.rows.map((item)=> item.creator_id);
    const { data: usersData, isLoading } = useMany<IUser>({
        resource: "users",
        ids: userIds,

    })

    const createDrawerFormProps = useModalForm<ICasbinObjectCreate, HttpError>({
        refineCoreProps: { action: "create" },
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;


    const editDrawerFormProps = useModalForm<ICasbinObjectUpdate, HttpError>({
        refineCoreProps: { action: "edit" },
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    const apiUrl = useApiUrl();
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
                renderCell: function render({row}){
                    if (isLoading) {
                        return "Загрузка...";
                    }
                    const user = usersData?.data.find(
                        (item) => item.id === row.creator_id,
                    );
                    // return user?.username
                    return (<Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                            alt={`${user?.last_name} ${user?.first_name}`}
                            src={`${apiUrl}/${user?.avatar}`}
                            title={`${user?.last_name} ${user?.first_name}`}
                        />
                        <Typography variant="body2">
                            {user?.last_name} {user?.first_name} {user?.patronymic}
                        </Typography>
                    </Stack>)
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
                            <EditButton hideText
                                //recordItemId={row.id}
                                onClick={()=>showEditDrawer(row.id)}/>
                            {/*<ShowButton hideText recordItemId={row.id}/>*/}
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
            },
        ],
        [t,isLoading,usersData?.data,showEditDrawer]
    )

    const {register, handleSubmit, control} =useForm<
        BaseRecord,
        HttpError,
        ICasbinObjectFilterVariables
        >({
        defaultValues:{
            q: getDefaultFilter("q", filters, "eq")
        }
    })

    return (
        <Grid container spacing={2}>
            <CreateResourcesAppDrawer {...createDrawerFormProps}/>
            <EditResourcesAppDrawer {...editDrawerFormProps}/>
            <Grid item xs={12} lg={2}>
                <Card sx={{paddingX: {xs: 2, md: 0}}}>
                    <CardHeader title={t("filter.title")}/>
                    <CardContent sx={{pt: 0}}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("admin/objects.filter.search.label")}
                                placeholder={t("admin/objects.filter.search.placeholder")}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {t("admin/objects.filter.submit")}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={10}>
                <List createButtonProps={{ onClick: () => showCreateDrawer()}}>
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
};
