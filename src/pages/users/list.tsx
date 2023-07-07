import React from "react";
import { useDataGrid, List, DateField, useAutocomplete } from "@refinedev/mui";
import {
  Checkbox,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";

import {DataGrid, ruRU, GridColumns, GridActionsCellItem} from "@mui/x-data-grid";

import {
  useTranslate,
  useNavigation,
  HttpError,
  CrudFilters,
  BaseRecord,
  getDefaultFilter,
  useApiUrl, useShow, useModal,
} from "@refinedev/core";

import { IUser, IUserFilterVariables } from "../../interfaces/IUser";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { ItemStatus } from "components/itemStatus";
import {EditOutlined} from "@mui/icons-material";
import {EditModalUserRole} from "../../components/users/editModalUserRole";


export const UserList = () => {
  const { edit } = useNavigation();
  const { show, visible, close } = useModal();
  const { queryResult, setShowId } = useShow<IUser>();
  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;
  const t = useTranslate();
  const { dataGridProps, search, filters } = useDataGrid<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    //initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, organization } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      filters.push({
        field: "organization__id__in",
        operator: "eq",
        value: (organization ?? [].length) > 0 ? organization : undefined,
      });

      // filters.push({
      //     field: "is_active",
      //     operator: "in",
      //     value: (is_active ?? []).length > 0 ? is_active : undefined,
      // });
      return filters;
    },

    sorters: {
      initial: [
        {
          field: "last_name",
          order: "desc",
        },
      ]
    }
  });

  const apiUrl = useApiUrl();

  const columns = React.useMemo<GridColumns<IUser>>(
    () => [
      {
        field: "is_active",
        headerName: t("users.fields.is_active"),
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
        field: "last_name",
        headerName: t("users.fields.fullname"),
        flex: 1.5,
        minWidth: 150,
        renderCell: function render({ row }) {
          return (
            <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
                alt={`${row.last_name} ${row.first_name}`}
                //src={row.avatar}
                src={`${apiUrl}/${row.avatar}`}
            />
              <Typography variant="body2">
                {row.last_name} {row.first_name} {row.patronymic}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: "organization",
        headerName: t("users.fields.organization.title"),
        flex: 1,
        valueGetter: ({ row }) => row?.organization?.title,
        minWidth: 150,
        sortable: false,
      },
      {
        field: "is_superuser",
        headerName: "Is Superuser",
        flex: 0.5,
        minWidth: 50,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },

      {
        field: "username",
        headerName: t("users.fields.username"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "created_at",
        headerName: t("users.fields.created_at"),
        flex: 0.5,
        minWidth: 80,
        renderCell: function render({ row }) {
          return <DateField value={row.created_at} format={"DD.MM.YYYY"} />;
        },
      },
      {
        field: "actions",
        type: "actions",
        sortable: false,
        headerName: t("table.actions"), //'Actions',
        flex: 0.5,
        minWidth: 100,
        getActions:({row})=>[
          <GridActionsCellItem
              key={1}
              label={t('buttons.edit')}
              icon={<EditOutlined color={'success'}/>}
              showInMenu
              onClick={()=>edit("users", row.id)}
          />,
          <GridActionsCellItem
              key={1}
              label={t('buttons.edit')}
              icon={<EditOutlined color={"warning"}/>}
              showInMenu
              onClick={()=>{
                show();
                setShowId(row.id);
              }}
          />,
        ],
        align: "center",
        headerAlign: "center",
      },
    ],
    [t, apiUrl, edit, show, setShowId]
  );

  const { register, handleSubmit, control } = useForm<
      BaseRecord,
      HttpError,
      IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      organization: getDefaultFilter("organization.id", filters, "eq"),
    },
  });

  const { autocompleteProps: organizationAutocompleteProps } = useAutocomplete({
    resource: "organizations",
    defaultValue: getDefaultFilter("organization.id", filters, "eq"),

    onSearch: (value) => {
      const filters: CrudFilters = [];
      filters.push({
        field: "q",
        operator: "eq",
        value: value.length > 0 ? value : undefined,
      });
      return filters;
    },

    sorters: [{ field: "id", order: "asc" }]
  });

  return (
    <Grid container spacing={2}>
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
                label={t("subunits.filter.search.label")}
                placeholder={t("subunits.filter.search.placeholder")}
                margin="dense"
                fullWidth
                autoFocus
                size="small"
              />
              <Controller
                control={control}
                name="organization"
                //defaultValue={null}
                render={({ field }) => (
                  <Autocomplete
                    {...organizationAutocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id ?? value);
                    }}
                    getOptionLabel={(item) => {
                      return (
                        organizationAutocompleteProps?.options?.find(
                          (p) => p.id.toString() === item.id.toString()
                        )?.title ?? ""
                      );
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.id.toString() === value.id?.toString() ||
                        option.id.toString() === value.toString()
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("subunits.filter.organization.label")}
                        placeholder={t(
                          "subunits.filter.organization.placeholder"
                        )}
                        margin="dense"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              {/*<Controller/>*/}
              <br />
              <Button type="submit" variant="contained">
                {t("subunits.filter.submit")}
              </Button>
            </Box>
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
            // onRowClick={(row) => {
            //   show("users", row.id);
            // }}
          />
        </List>
        {record && (<EditModalUserRole
            record={record}
            close={close}
            visible={visible}
        />)}
      </Grid>
    </Grid>
  );
};
