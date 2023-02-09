import {Autocomplete, Box, Checkbox, Edit, FormControlLabel, TextField, useAutocomplete,} from '@pankod/refine-mui';
import {Controller, useForm} from '@pankod/refine-react-hook-form';
import {IUpdateUser} from 'interfaces/IUser';
import {CrudFilters, useTranslate} from "@pankod/refine-core";

export const UserEdit = () => {
    const {

        refineCore: {queryResult, onFinish},
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const t = useTranslate();

    const usersData = queryResult?.data?.data;

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
            }),

            defaultValue:
                usersData?.organization == null
                    ? null
                    : queryResult?.data?.data.organization.id,
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
                    <Controller
                        control={control}
                        name="is_superuser"
                        // eslint-disable-next-line
                        defaultValue={null as any}
                        render={({field}) => (
                            <FormControlLabel
                                label={t('users.fields.is_superuser')}
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
                        render={({field}) => (
                            <FormControlLabel
                                label={t('users.fields.is_active')}
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
                                        organizationAutocompleteProps?.options?.find(
                                            (p) => p.id === item.id,
                                        )?.name ?? ""
                                    );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === undefined ||
                                    option.id === value.id
                                    // option?.id?.toString() === value?.id?.toString() ||
                                    // option?.id?.toString() === value?.toString()

                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t('users.fields.organization.title')}
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
                        InputLabelProps={{shrink: true}}
                        type="password"
                        label={t('users.fields.password')}
                        name="password"
                    />
                </Box>
            </Edit>
        </form>
    );
};
