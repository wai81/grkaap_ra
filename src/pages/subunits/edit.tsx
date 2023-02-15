import {CrudFilters, IResourceComponentsProps, useTranslate} from "@pankod/refine-core";
import {MuiInferencer} from "@pankod/refine-inferencer/mui";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {
    Autocomplete,
    Box,
    Checkbox,
    Edit,
    FormControlLabel,
    Switch,
    TextField,
    useAutocomplete
} from "@pankod/refine-mui";
import {ICreateSubunit, IUpdateSubunit} from "../../interfaces/ISubunit";

export const SubunitEdit = () => {
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
            resource: 'organizations/',
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
        const subunit: IUpdateSubunit= {
            name: data.name,
            title: `${data.name} (${data.organization.name})`,
            color_subunit: data.color_subunit,
            organization_id: data.organization.id,
            is_active: data.is_active,
        };
        onFinish(subunit);
    };

    return(
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
                        {...register('title', )}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={t('subunits.fields.fullname')}
                        name="fullname"
                        disabled={true}
                    />
                    <TextField
                        {...register('name', )}
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
                                        )?.name  ?? ''} (${item.id})`
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
                    <Controller
                        control={control}
                        name="is_active"
                        // eslint-disable-next-line
                        defaultValue={null as any}
                        render={({field}) => (
                            <FormControlLabel
                                label={t('subunits.fields.is_active')}
                                control={
                                    <Switch
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
                </Box>
            </Edit>
        </form>
    );
};
