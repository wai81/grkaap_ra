import {Autocomplete, Box, Create, TextField, useAutocomplete,} from '@pankod/refine-mui';
import {Controller, useForm} from '@pankod/refine-react-hook-form';
import {ICreateUser} from 'interfaces/IUser';
import {CrudFilters, useTranslate} from "@pankod/refine-core";

export const UserCreate = () => {
    const {
        refineCore: {formLoading, onFinish},
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const t = useTranslate();

    const {autocompleteProps: organizationAutocompleteProps} =
        useAutocomplete({
            resource: 'organizations',
            sort: [{field: 'id', order: 'asc'}],
            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            })
        });

    const handleOnSubmit = (data: any) => {
        const user: ICreateUser = {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            patronymic: data.patronymic,
            password: data.password,
            organization_id: data.organization.id,
        };
        onFinish(user);
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Create
                isLoading={formLoading}
                saveButtonProps={{
                    type: 'submit',
                }}
            >
                <Box
                    component="form"
                    sx={{display: 'flex', flexDirection: 'column'}}
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
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('users.fields.username')}
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
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('users.fields.last_name')}
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
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('users.fields.first_name')}
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
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('users.fields.patronymic')}
                        name="patronymic"
                    />
                    {/* <Controller
          control={control}
          name="is_active"
          // eslint-disable-next-line
          defaultValue={true}
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
        /> */}
                    <Controller
                        control={control}
                        name="organization"
                        rules={{required: 'This field is required'}}
                        // eslint-disable-next-line
                        defaultValue={null as any}
                        render={({field}) => (
                            <Autocomplete
                                {...organizationAutocompleteProps}
                                {...field}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                }}
                                getOptionLabel={(item) => {

                                    return (
                                        `${organizationAutocompleteProps?.options?.find(
                                            (p) => p.id === item.id
                                        )?.title  ?? ''} (${item.id})`
                                    );
                                }}
                                isOptionEqualToValue={(option, value) => {

                                    return option.id === value.id;
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('users.fields.organization.title')}
                                        margin="normal"
                                        variant="outlined"
                                        error={!!(errors as any)?.organization?.id}
                                        helperText={(errors as any)?.organization?.id?.message}
                                        required
                                    />
                                )}
                            />
                        )}
                    />
                    <TextField
                        {...register('password', {
                            required: 'This field is required',
                        })}
                        error={!!(errors as any)?.password}
                        helperText={(errors as any)?.password?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="password"
                        label={t('users.fields.password')}
                        name="password"
                    />
                </Box>
            </Create>
        </form>
    );
};
