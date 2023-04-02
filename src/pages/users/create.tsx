import { Create, useAutocomplete } from "@refinedev/mui";
import {
  Autocomplete,
  Avatar,
  Box,
  Grid,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { ICreateUser, IUser } from "interfaces/IUser";
import { CrudFilters, useApiUrl, useTranslate } from "@refinedev/core";
import axios from "axios";
import { TOKEN_KEY } from "../../constants";

export const UserCreate = () => {
  const {
    refineCore: { formLoading, onFinish },
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const t = useTranslate();
  const apiUrl = useApiUrl();
  const imageInput = watch("avatar");

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
    const user: ICreateUser = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic,
      password: data.password,
      avatar: data.avatar,
      organization_id: data.organization.id,
    };
    onFinish(user);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Create
        isLoading={formLoading}
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
                      required:  t("required.field"),
                    })}
                    error={!!(errors as any)?.last_name}
                    helperText={(errors as any)?.last_name?.message}
                    //margin="normal"
                    fullWidth
                    type="text"
                    label={t("users.fields.last_name")}
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
                    label={t("users.fields.patronymic")}
                    name="patronymic"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("username", {
                    required: t("required.field"),
                  })}
                  error={!!(errors as any)?.username}
                  helperText={(errors as any)?.username?.message}
                  margin="normal"
                  fullWidth
                  type="text"
                  label={t("users.fields.username")}
                  name="username"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("password", {
                    required: t("required.field"),
                  })}
                  error={!!(errors as any)?.password}
                  helperText={(errors as any)?.password?.message}
                  margin="normal"
                  fullWidth
                  type="password"
                  label={t("users.fields.password")}
                  placeholder="●●●●●●●●"
                  autoComplete="current-password"
                  name="password"
                  size="small"
                />
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
                    rules={{ required:  t("required.field") }}
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
                        isOptionEqualToValue={(option, value) => {
                          return option.id === value.id;
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("users.fields.organization.title")}
                            //margin="normal"
                            variant="outlined"
                            error={!!(errors as any)?.organization?.id}
                            helperText={
                              (errors as any)?.organization?.id?.message
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
      </Create>
    </form>
  );
};
