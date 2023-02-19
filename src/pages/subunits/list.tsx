import React from "react";
import {
  Autocomplete,
  BooleanField,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  DataGrid,
  EditButton,
  ExportButton,
  FormControl,
  Grid,
  GridColumns,
  InputLabel,
  List,
  MenuItem,
  ruRU,
  Select,
  TextField,
  useAutocomplete,
  useDataGrid,
} from "@pankod/refine-mui";

import { ISubunit, ISubunitFilterVariables } from "../../interfaces/ISubunit";
import {
  BaseRecord,
  CrudFilters,
  getDefaultFilter,
  HttpError,
  useExport,
  useNavigation,
  useTranslate,
} from "@pankod/refine-core";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { ItemStatus } from "components/itemStatus";

export const SubunitsList = () => {
  //const {show, edit} = useNavigation();
  const { show } = useNavigation();
  const t = useTranslate();
  const { dataGridProps, search, filters, sorter } = useDataGrid<
    ISubunit,
    HttpError,
    ISubunitFilterVariables
  >({
    //initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, organization, is_active } = params;

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

      filters.push({
        field: "is_active",
        operator: "eq",
        value: is_active !== "" ? is_active : undefined,
      });
      return filters;
    },
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
  });

  const columns = React.useMemo<GridColumns<ISubunit>>(
    () => [
      {
        field: "is_active",
        headerName: t("subunits.fields.is_active"),
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
        field: "title",
        headerName: t("subunits.fields.title"),
        //valueGetter: ({row}) => `${row.name} (${row.organization?.name})`,
        minWidth: 500,
        flex: 1,
        filterable: false,
      },
      // {
      //     field: "fullname_",
      //     headerName: t('subunits.fields.fullname'),
      //     valueGetter: ({row}) => `${row.name} (${row.organization?.name})`,
      //     minWidth: 500,
      //     flex:1,
      //     filterable: false,
      // },
      {
        field: "color_subunit",
        headerName: t("subunits.fields.color_subunit"),
        minWidth: 50,
        flex: 1,
        filterable: false,
      },

      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        sortable: false,
        filterable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              {/*<ShowButton hideText recordItemId={row.id} />*/}
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 50,
        flex: 1,
      },
    ],
    [t]
  );

  const { isLoading, triggerExport } = useExport<ISubunit>({
    sorter,
    filters,
    pageSize: 100,
    maxItemCount: 100,
    mapData: (item) => {
      return {
        id: item.id,
        name: item.name,
        title: item.title,
        organization: item.organization.title,
        active: item.is_active,
        created: item.created_at,
      };
    },
  });

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
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
                    <InputLabel id="isActive-select">
                      {t("subunits.filter.is_active.label")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="isActive-select"
                      label={t("subunits.filter.is_active.label")}
                    >
                      <MenuItem value="">
                        <em>{t("subunits.filter.is_active.none")}</em>
                      </MenuItem>
                      <MenuItem value="true">
                        {t("subunits.filter.is_active.true")}
                      </MenuItem>
                      <MenuItem value="false">
                        {t("subunits.filter.is_active.false")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <br />
              <Button type="submit" variant="contained">
                {t("subunits.filter.submit")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <List
          headerButtons={({ defaultButtons }) => (
            <>
              {defaultButtons}
              <ExportButton onClick={triggerExport} loading={isLoading} />
            </>
          )}
        >
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
              show("subunits", row.id);
            }}
          />
        </List>
      </Grid>
    </Grid>
  );
};
