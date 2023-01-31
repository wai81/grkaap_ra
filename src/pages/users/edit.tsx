import {
  Edit,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  useAutocomplete,
} from '@pankod/refine-mui';
import { useForm, Controller } from '@pankod/refine-react-hook-form';
import { IOrganization } from 'interfaces/IOrganization';
import { IUpdateUser } from 'interfaces/IUser';

export const UserEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, onFinish },
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const usersData = queryResult?.data?.data;

  const { autocompleteProps: organizationAutocompleteProps } =
    useAutocomplete<IOrganization>({
      resource: 'organizations',
      sort: [{ field: 'id', order: 'asc' }],
      defaultValue: queryResult?.data?.data.organization.id,
    });

  const handleOnSubmit = (data: any) => {
    console.log(data);
    const user: IUpdateUser = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      patronymic: data.patronymic,
      password: data.password,
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
          type: 'submit',
        }}
      >
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column' }}
          autoComplete="off"
        >
          <TextField
            {...register('username', {
              required: 'This field is required',
            })}
            error={!!(errors as any)?.username}
            helperText={(errors as any)?.username?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Username"
            name="username"
          />
          <TextField
            {...register('last_name', {
              required: 'This field is required',
            })}
            error={!!(errors as any)?.last_name}
            helperText={(errors as any)?.last_name?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Last Name"
            name="last_name"
          />
          <TextField
            {...register('first_name', {
              required: 'This field is required',
            })}
            error={!!(errors as any)?.first_name}
            helperText={(errors as any)?.first_name?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="First Name"
            name="first_name"
          />
          <TextField
            {...register('patronymic', {
              required: 'This field is required',
            })}
            error={!!(errors as any)?.patronymic}
            helperText={(errors as any)?.patronymic?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Patronymic"
            name="patronymic"
          />
          <Controller
            control={control}
            name="is_superuser"
            // eslint-disable-next-line
            defaultValue={null as any}
            render={({ field }) => (
              <FormControlLabel
                label="Is Superuser"
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
          <Controller
            control={control}
            name="is_active"
            // eslint-disable-next-line
            defaultValue={null as any}
            render={({ field }) => (
              <FormControlLabel
                label="Is Active"
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
          <Controller
            control={control}
            name="organization"
            rules={{ required: 'This field is required' }}
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
                  return (
                    organizationAutocompleteProps?.options?.find(
                      (p) => p?.id?.toString() === item?.id?.toString()
                    )?.name ?? ''
                  );
                }}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  option?.id?.toString() === value?.name?.toString()
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Organization"
                    margin="normal"
                    variant="outlined"
                    error={!!(errors as any)?.organization?.name}
                    helperText={(errors as any)?.organization?.name?.message}
                    required
                  />
                )}
              />
            )}
          />
          <TextField
            {...register('password')}
            error={!!(errors as any)?.password}
            helperText={(errors as any)?.password?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="password"
            label="Password"
            name="password"
          />
        </Box>
      </Edit>
    </form>
  );
};
