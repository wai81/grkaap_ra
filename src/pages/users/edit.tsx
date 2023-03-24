import { Edit, useAutocomplete } from "@refinedev/mui";

import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {IUpdateUser} from 'interfaces/IUser';
import { CrudFilters, useTranslate } from "@refinedev/core";

export const UserEdit = () => {
    const {

        refineCore: {queryResult, onFinish},
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm();

    const t = useTranslate();

    const usersData = queryResult?.data?.data;

    const {autocompleteProps: organizationAutocompleteProps} =
        useAutocomplete({
            resource: 'organizations',

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

            sorters: [{field: 'id', order: 'asc'}]
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
                            {t('users.fields.is_active')}
                        </FormLabel>
                    <Controller
                        control={control}
                        name="is_active"
                        // eslint-disable-next-line
                        defaultValue={true}
                        render={({field}) => (
                            <RadioGroup
                                {...field}
                                onChange={(event) => {
                                    const value =
                                        event.target.value ===
                                        "true";

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
                            // <FormControlLabel
                            //     label={t('users.fields.is_active')}
                            //     control={
                            //         <Switch
                            //             {...field}
                            //             checked={field.value}
                            //             onChange={(event) => {
                            //                 field.onChange(event.target.checked);
                            //             }}
                            //         />
                            //     }
                            // />
                        )}
                    />
                    </FormControl>
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
