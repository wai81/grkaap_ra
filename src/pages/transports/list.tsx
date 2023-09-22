import {
  BaseRecord,
  CrudFilters,
  getDefaultFilter,
  HttpError,
  useApiUrl,
  useTranslate,
} from "@refinedev/core";

import {BooleanField, DeleteButton, EditButton, List, useDataGrid} from "@refinedev/mui";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";

import {
  ICreateTransport,
  ITransporFilterVariables,
  ITransport,
  IUpdateTransport,
} from "../../interfaces/ITransport";
import { IBookingTransportFilterVariables } from "../../interfaces/IBookingTransport";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
//import { ItemStatus } from "components/itemStatus";
import { CreateTransportDrawer, EditTransportDrawer } from "components/transports";
import { ShowTransportDrawer } from "components/transports/show";
import {Check, Close} from "@mui/icons-material";

export const TransportList = () => {
  const t = useTranslate();
  const { dataGridProps, search, filters } = useDataGrid<
    ITransport,
    HttpError,
    ITransporFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, is_active } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });
      filters.push({
        field: "is_active",
        operator: "eq",
        value: is_active !== "" ? is_active : undefined,
      });
      return filters;
    },

    sorters: {
      initial: [
        {
          field: "title",
          order: "asc",
        },
      ]
    }
  });

  const apiUrl = useApiUrl();

  const createDrawerFormProps = useModalForm<ICreateTransport, HttpError>({
    refineCoreProps: { action: "create" },
  });
  const {
    modal: { show: showCreateDrawer },
  } = createDrawerFormProps;

  const editDrawerFormProps = useModalForm<IUpdateTransport, HttpError>({
    refineCoreProps: { action: "edit" },
  });
  const {
    modal: { show: showEditDrawer },
  } = editDrawerFormProps;


  const showDrawerFormProps = useModalForm<ITransport, HttpError>({
    refineCoreProps: { action: "edit", resource: "transports" },
  });
  const {
    modal: { show: showShowDrawer },
  } = showDrawerFormProps;

  const columns = React.useMemo<GridColDef<ITransport>[]>(
    () => [
      {
        field: "is_active",
        headerName: t("transports.fields.is_active"),
        align: "center",
        headerAlign: "center",
        flex: 0.2,
        renderCell:  function render({ row }){
          return (
              <BooleanField
                  value={row.is_active === true}
                  trueIcon={<Check color={"success"}/>}
                  falseIcon={<Close color={"error"}/>}
                  valueLabelTrue='true'
                  valueLabelFalse='false'
              />
          );
        }
      },
      {
        field: "image_url",
        align: "center",
        headerAlign: "center",
        headerName: "",
        flex: 0.2,
        renderCell: function render({ row }) {
          return <Avatar
              src={`${apiUrl}/${row.image_url}`}
              sx={{
                cursor: "pointer",
                width: {
                  xs: 40,
                  md: 70,
                },
                height: {
                  xs: 20,
                  md: 50,
                },
                borderRadius:1
              }}
          />;
        },
      },
      {
        field: "title",
        headerName: t("transports.fields.title"),
        minWidth: 100,
        flex: 1,
        renderCell: function render({ row }) {
          return  <Typography variant="body2">
                    {!row.is_active ? <s>{row.title}</s> : row.title}
                  </Typography>;
        },
      },
      {
        field: "description",
        headerName: t("transports.fields.details"),
        minWidth: 200,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        sortable: false,
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText 
              //recordItemId={row.id}
              onClick={() => showEditDrawer(row.id)} />
              {/*<ShowButton hideText recordItemId={row.id}/>*/}
              <DeleteButton
                 hideText
              />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 10,
        flex: 0.5,
      },
    ],
    [t, apiUrl, showEditDrawer]
  );

  const { register, handleSubmit, control } = useForm<
    BaseRecord,
    HttpError,
    IBookingTransportFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <Grid container spacing={2}>
      <CreateTransportDrawer {...createDrawerFormProps} />
      <EditTransportDrawer {...editDrawerFormProps} />
      <ShowTransportDrawer {...showDrawerFormProps} />
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
                label={t("transports.filter.search.label")}
                placeholder={t("transports.filter.search.placeholder")}
                margin="normal"
                fullWidth
                autoFocus
                size="small"
              />
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
                    <InputLabel id="isActive-select">
                      {t("transports.filter.is_active.label")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="isActive-select"
                      label={t("transports.filter.is_active.label")}
                    >
                      <MenuItem value="">
                        <em>{t("transports.filter.is_active.none")}</em>
                      </MenuItem>
                      <MenuItem value="true">
                        {t("transports.filter.is_active.true")}
                      </MenuItem>
                      <MenuItem value="false">
                        {t("transports.filter.is_active.false")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <br />
              <Button type="submit" variant="contained">
                {t("transports.filter.submit")}
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
            sx={{
              "& .MuiDataGrid-cell:hover": {
                cursor: "pointer",
              },
            }}
            onRowClick={(row) => {
              showShowDrawer(row.id);
            }}
          />
        </List>
      </Grid>
    </Grid>
  );
};
