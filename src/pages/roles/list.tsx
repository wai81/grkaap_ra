import {Box, Button, Card, CardContent, CardHeader, Grid, TextField} from "@mui/material";
import React from "react";
import {
    BaseRecord,
    CrudFilters,
    getDefaultFilter,
    HttpError,
    useMany,
    useModal,
    useShow,
    useTranslate
} from "@refinedev/core";
import {DateField, List, useDataGrid} from "@refinedev/mui";
import {DataGrid, ruRU, GridColumns, GridActionsCellItem} from "@mui/x-data-grid";
import {ICreateRole, IRole, IRoleFilterVariables} from "../../interfaces/IRole";
import {IUser} from "../../interfaces/IUser";
import {useForm, useModalForm} from "@refinedev/react-hook-form";
import {CreateRoleDrawer, EditRoleDrawer, EditPermissions} from "../../components/roles";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import {EditOutlined} from "@mui/icons-material";




export const RoleList = () => {

    const { show, visible, close } = useModal();
    const { queryResult, setShowId } = useShow<IRole>();
    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;

    const t = useTranslate()
    const { dataGridProps, search, filters } = useDataGrid<
        IRole,
        HttpError,
        IRoleFilterVariables
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
        queryOptions:{
            enabled: userIds.length > 0,
        }
    })

    const createDrawerFormProps = useModalForm<ICreateRole, HttpError>({
        refineCoreProps: { action: "create" },
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;


    const editDrawerFormProps = useModalForm<IRole, HttpError>({
        refineCoreProps: { action: "edit" },
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    // const updatePermissionsModalProps = useModalForm<I>({
    //
    // });
    // const {
    //     modal: { show: showEditModal },
    // } = updatePermissionsModalProps;

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
                getActions: ({ row }) =>[
                     <GridActionsCellItem
                         key={1}
                         label={t('buttons.edit')}
                         icon={<EditOutlined />}
                         showInMenu
                         onClick={()=>showEditDrawer(row.id)}
                     />,
                    <GridActionsCellItem
                        key={1}
                        label={t('buttons.permission')}
                        icon={<GppMaybeIcon />}
                        showInMenu
                        onClick={()=>{
                            show();
                            setShowId(row.id);
                        }}
                    />
                ],
                align: "center",
                headerAlign: "center",
            },
        ],
        [t,isLoading,show, setShowId, usersData?.data, showEditDrawer],
    );

    const {register, handleSubmit, control} =useForm<
        BaseRecord,
        HttpError,
        IRoleFilterVariables
        >({
        defaultValues:{
            q: getDefaultFilter("q", filters, "eq")
        }
    })

    return (
        <Grid container spacing={2}>
            <CreateRoleDrawer {...createDrawerFormProps}/>
            <EditRoleDrawer {...editDrawerFormProps}/>
            <Grid item xs={12} lg={2}>
                <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
                    <CardHeader title={t("filter.title")} />
                    <CardContent sx={{ pt: 0 }}>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            autoComplete="off"
                            onSubmit={handleSubmit(search)}
                        >
                            <TextField
                                {...register("q")}
                                label={t("admin/roles.filter.search.label")}
                                placeholder={t("admin/roles.filter.search.placeholder")}
                                margin="normal"
                                fullWidth
                                autoFocus
                                size="small"
                            />
                            <br />
                            <Button type="submit" variant="contained">
                                {t("admin/roles.filter.submit")}
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
                {record && (<EditPermissions
                    record={record}
                    close={close}
                    visible={visible}
                />)}
            </Grid>
        </Grid>
    )
}