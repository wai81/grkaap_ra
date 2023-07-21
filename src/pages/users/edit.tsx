import { Edit, useAutocomplete } from "@refinedev/mui";

import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Stack,
  Typography,
  Input,
  Avatar,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { IUpdateUser } from "interfaces/IUser";
import { CrudFilters, useApiUrl, useTranslate } from "@refinedev/core";
import axios from "axios";
import { TOKEN_KEY } from "../../constants";

export const UserEdit = () => {
  const {
    refineCore: { queryResult, onFinish },
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const t = useTranslate();
  const apiUrl = useApiUrl();
  const imageInput = watch("avatar");

  const usersData = queryResult?.data?.data;

  const { autocompleteProps: organizationAutocompleteProps } = useAutocomplete({
    resource: "organizations",

    onSearch: (value) => {
      const filters: CrudFilters = [];
      filters.push({
        field: "q",
        operator: "eq",
        value: value.length > 0 ? value : undefined,
      });
      return filters;
    },

    defaultValue:
      usersData?.organization == null
        ? null
        : queryResult?.data?.data.organization.id,

    sorters: [{ field: "id", order: "asc" }],
  });

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    const target = event.target;
    const file: File = (target.files as FileList)[0];
    formData.append("image", file);
    const token = localStorage.getItem(TOKEN_KEY);
    const res = await axios.post<{ url: string }>(
      `${apiUrl}/users/upload/avatar`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    // eslint-disable-next-line
    const imagePaylod: any = [
      {
        filename: res.data.url,
      },
    ];

    setValue("avatar", res.data.url, { shouldValidate: true });
  };

  const handleOnSubmit = (data: any) => {
    console.log(data);
    const user: IUpdateUser = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic,
      password: data.password,
      avatar: data.avatar,
      organization_id: data.organization.id,
      is_active: data.is_active,
      is_superuser: data.is_superuser,
    };
    onFinish(user);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Edit
        saveButtonProps={{
          type: "submit",
        }}
      >
        <Grid
          container
          marginTop="4px"
          sx={{
            marginX: { xs: "0px" },
            paddingX: { xs: 1, md: 4 },
          }}
          spacing={2}
        >
          <Grid mb={1} item xs={12} md={2}>
            <Stack gap={1} justifyContent="center" alignItems="center">
              <label htmlFor="avatar-input">
                <Input
                  id="avatar-input"
                  type="file"
                  sx={{
                    display: "none",
                  }}
                  onChange={onChangeHandler}
                />
                <input id="file" {...register("avatar")} accept="image/*" type="hidden" />
                <Avatar
                  sx={{
                    cursor: "pointer",
                    width: {
                      xs: "120px",
                      md: "160px",
                      lg: "200px",
                    },
                    height: {
                      xs: "120px",
                      md: "160px",
                      lg: "200px",
                    },
                  }}
                  src={`${apiUrl}/${imageInput}`}
                  alt="User Picture"
                />
              </label>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {t("users.fields.image_description")}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                {t("users.fields.image_validation")}
              </Typography>
            </Stack>
          </Grid>
          <Grid mb={1} item xs={12} md={5}>
            <Grid
              container
              sx={{
                marginX: { xs: "0px" },
                paddingX: { xs: 1, md: 2 },
              }}
              spacing={1}
            >
              <Grid
                container
                direction={"row"}
                spacing={1}
                //marginTop="4px"
                sx={{
                  marginX: { xs: "2px" },
                }}
              >
                <Grid item xs={12} md={5}>
                  <TextField
                    {...register("last_name", {
                      required: t("required.field"),
                    })}
                    error={!!(errors as any)?.last_name}
                    helperText={(errors as any)?.last_name?.message}
                    //margin="normal"
                    fullWidth
                    type="text"
                    label={t("users.fields.last_name")}
                    InputLabelProps={{ shrink: true }}
                    name="last_name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={3.5}>
                  <TextField
                    {...register("first_name", {
                      required: t("required.field"),
                    })}
                    error={!!(errors as any)?.first_name}
                    helperText={(errors as any)?.first_name?.message}
                    //margin="normal"
                    fullWidth
                    type="text"
                    label={t("users.fields.first_name")}
                    InputLabelProps={{ shrink: true }}
                    name="first_name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={3.5}>
                  <TextField
                    {...register("patronymic",)}
                    //margin="normal"
                    fullWidth
                    type="text"
                    InputLabelProps={{ shrink: true }}
                    label={t("users.fields.patronymic")}
                    name="patronymic"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("username", {
                      required:  t("required.field"),
                    })}
                    error={!!(errors as any)?.username}
                    helperText={(errors as any)?.username?.message}
                    margin="normal"
                    fullWidth
                    type="text"
                    label={t("users.fields.username")}
                    InputLabelProps={{ shrink: true }}
                    name="username"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("password")}
                    error={!!(errors as any)?.password}
                    helperText={(errors as any)?.password?.message}
                    margin="normal"
                    fullWidth
                    type="password"
                    label={t("users.fields.password")}
                    InputLabelProps={{ shrink: true }}
                    placeholder="●●●●●●●●"
                    autoComplete="current-password"
                    name="password"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl>
                  <FormLabel
                    sx={{
                      marginBottom: "5px",
                      fontWeight: "700",
                      // fontSize: "14px",
                      color: "text.primary",
                    }}
                    required
                  >
                    {t("users.fields.is_active")}
                  </FormLabel>
                  <Controller
                    control={control}
                    name="is_active"
                    // eslint-disable-next-line
                    defaultValue={true}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        onChange={(event) => {
                          const value = event.target.value === "true";

                          setValue("is_active", value, {
                            shouldValidate: true,
                          });

                          return value;
                        }}
                        row
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label={t("users.fields.status.enable")}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label={t("users.fields.status.disable")}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl>
                  <FormLabel
                    sx={{
                      marginBottom: "5px",
                      fontWeight: "700",
                      // fontSize: "14px",
                      color: "text.primary",
                    }}
                  >
                    {t("users.fields.label_superuser")}
                  </FormLabel>
                  <Controller
                    control={control}
                    name="is_superuser"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                      <FormControlLabel
                        label={t("users.fields.is_superuser")}
                        control={
                          <Checkbox
                            {...field}
                            checked={field.value}
                            onChange={(event) => {
                              field.onChange(event.target.checked);
                            }}
                          />
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid mb={1} item xs={12} md={5}>
            <Grid
              container
              sx={{
                marginX: { xs: "0px" },
                paddingX: { xs: 1, md: 2 },
              }}
              spacing={1}
            >
              <Grid
                container
                direction={"row"}
                spacing={1}
                //marginTop="4px"
                sx={{
                  marginX: { xs: "2px" },
                }}
              >
                <Grid item xs={12} md={12}>
                  <Controller
                    control={control}
                    name="organization"
                    rules={{ required: t("required.field") }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                      <Autocomplete
                        {...organizationAutocompleteProps}
                        {...field}
                        onChange={(_, value) => {
                          field.onChange(value);
                        }}
                        getOptionLabel={(item) => {
                          return `${
                            organizationAutocompleteProps?.options?.find(
                              (p) => p.id === item.id
                            )?.title ?? ""
                          } (${item.id})`;
                        }}
                        isOptionEqualToValue={
                          (option, value) =>
                            value === undefined || option.id === value.id
                          // option?.id?.toString() === value?.id?.toString() ||
                          // option?.id?.toString() === value?.toString()
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("users.fields.organization.title")}
                            //margin="normal"
                            variant="outlined"
                            error={!!(errors as any)?.organization?.name}
                            helperText={
                              (errors as any)?.organization?.name?.message
                            }
                            required
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Edit>
    </form>
  );
};
