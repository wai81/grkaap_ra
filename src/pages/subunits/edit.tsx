import {CrudFilters, useTranslate} from "@pankod/refine-core";
//import {MuiInferencer} from "@pankod/refine-inferencer/mui";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {
    Autocomplete,
    Box,
    Edit,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    useAutocomplete
} from "@pankod/refine-mui";
import {IUpdateSubunit} from "../../interfaces/ISubunit";

export const SubunitEdit = () => {
    const {

        refineCore: {queryResult, onFinish},
        register,
        control,
        handleSubmit,
        formState: {errors},
        setValue
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
            title: `${data.name} (${data.organization.title})`,
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
                        label={t('subunits.fields.title')}
                        name="title"
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
                    {/*<Controller*/}
                    {/*    control={control}*/}
                    {/*    name="is_active"*/}
                    {/*    // eslint-disable-next-line*/}
                    {/*    defaultValue={null as any}*/}
                    {/*    render={({field}) => (*/}
                    {/*        <FormControlLabel*/}
                    {/*            label={t('subunits.fields.is_active')}*/}
                    {/*            control={*/}
                    {/*                <Switch*/}
                    {/*                    {...field}*/}
                    {/*                    checked={field.value}*/}
                    {/*                    onChange={(event) => {*/}
                    {/*                        field.onChange(event.target.checked);*/}
                    {/*                    }}*/}
                    {/*                />*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
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
                            {t('subunits.fields.is_active')}
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
                                        control={<Radio/>}
                                        label={t("subunits.fields.status.enable")}
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio/>}
                                        label={t("subunits.fields.status.disable")}
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Box>
            </Edit>
        </form>
    );
};
