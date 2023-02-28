import React from "react";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  EditButton,
  List,
  Checkbox,
  DateField,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  useAutocomplete,
  TextField,
  Autocomplete,
  Button,
  ruRU,
} from "@pankod/refine-mui";
import {
  useTranslate,
  useNavigation,
  HttpError,
  CrudFilters,
  BaseRecord,
  getDefaultFilter,
} from "@pankod/refine-core";
import { IUser, IUserFilterVariables } from "../../interfaces/IUser";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { ISubunitFilterVariables } from "../../interfaces/ISubunit";
import { ItemStatus } from "components/itemStatus";

export const UserList = () => {
  const { show } = useNavigation();
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
    initialSorter: [
      {
        field: "last_name",
        order: "desc",
      },
    ],
  });

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
        headerName: t("users.fields.last_name"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "first_name",
        headerName: t("users.fields.first_name"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "patronymic",
        headerName: t("users.fields.patronymic"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "organization",
        headerName: t("users.fields.organization.title"),
        flex: 1,
        valueGetter: ({ row }) => row?.organization?.title,
        minWidth: 150,
        sortable: false,
        // renderCell: function render({ value }) {
        //   return organizationIsLoading ? (
        //     <>Loading...</>
        //   ) : (
        //     organizationData?.data?.find((item) => item.id === value)?.name
        //   );
        // },
      },
      {
        field: "is_superuser",
        headerName: "Is Superuser",
        flex: 1,
        minWidth: 50,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />;
        },
      },

      {
        field: "username",
        headerName: t("users.fields.username"),
        flex: 1,
        minWidth: 200,
      },
      {
        field: "created_at",
        headerName: t("users.fields.created_at"),
        flex: 1,
        minWidth: 80,
        renderCell: function render({ value }) {
          return <DateField value={value} format={"DD.MM.YYYY"} />;
        },
      },
      {
        field: "actions",
        type: "actions",
        sortable: false,
        headerName: t("table.actions"), //'Actions',
        flex: 1,
        minWidth: 100,
        // getActions: ({id}) => [
        //     // @ts-expect-error `@mui/x-data-grid@5.17.12` broke the props of `GridActionsCellItem` and requires `onResize` and `onResizeCapture` props which should be optional.
        //     <GridActionsCellItem
        //         key={1}
        //         sx={{padding: "2px 6px"}}
        //         label={t('buttons.edit.tsx')}
        //         icon={<Edit color="success"/>}
        //         onClick={() => edit.tsx("users", row.id)}
        //         showInMenu
        //     />
        // ],
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
  );

  const { register, handleSubmit, control } = useForm<
    BaseRecord,
    HttpError,
    ISubunitFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      organization: getDefaultFilter("organization.id", filters, "eq"),
    },
  });

  const { autocompleteProps: organizationAutocompleteProps } = useAutocomplete({
    resource: "organizations",
    sort: [{ field: "id", order: "asc" }],
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
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
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
                margin="normal"
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
                        )?.name ?? ""
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
                        margin="normal"
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
      <Grid item xs={12} lg={9}>
        <List>
          <DataGrid
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
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
      </Grid>
    </Grid>
  );
};
