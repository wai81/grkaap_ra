import { CrudFilters, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, TextField } from "@mui/material";
import {ICreateSubunit} from "../../interfaces/ISubunit";

export const SubunitCreate = () => {
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

            onSearch: ((value) => {
                const filters: CrudFilters = [];
                filters.push({
                    field: "q",
                    operator: "eq",
                    value: (value.length) > 0 ? value : undefined,
                });
                return filters
            }),

            sorters: [{field: 'id', order: 'asc'}]
        });

    const handleOnSubmit = (data: any) => {
        const subunit: ICreateSubunit= {
            name: data.name,
            title: `${data.name} (${data.organization.title})`,
            color_subunit: data.color_subunit,
            organization_id: data.organization.id,
        };
        onFinish(subunit);
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Create
                isLoading={formLoading}
                saveButtonProps={{
                    type: 'submit',
                }}
            >
                <Box component={"form"}
                     sx={{display: 'flex', flexDirection: 'column'}}
                     autoComplete="off"
                >
                    <TextField
                        {...register('name', {
                            required: 'This field is required',
                        })}
                        error={!!(errors as any)?.name}
                        helperText={(errors as any)?.name?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('subunits.fields.name')}
                        name="name"
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
                                        label={t('subunits.fields.organization.title')}
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

                </Box>
            </Create>
        </form>
    );
};
