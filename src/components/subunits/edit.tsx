import {CrudFilters, HttpError, useApiUrl, useTranslate} from "@pankod/refine-core";
import {Controller, UseModalFormReturnType} from "@pankod/refine-react-hook-form";
import {
    Autocomplete,
    Box,
    Drawer,
    Edit,
    FormControlLabel,
    IconButton,
    Stack,
    Switch,
    TextField,
    useAutocomplete
} from "@pankod/refine-mui";
import {ISubunit, IUpdateSubunit} from "../../interfaces/ISubunit";
import React from "react";
import {IOrganization} from "../../interfaces/IOrganization";
import CloseIcon from "@mui/icons-material/Close";

export const EditSubunit: React.FC<UseModalFormReturnType<ISubunit, HttpError, ISubunit>> = (
    {
        register,
        control,
        handleSubmit,
        formState: {errors},
        refineCore: {queryResult, onFinish},
        modal: {visible, close},
        saveButtonProps,
        getValues,
    }
) => {
    // export const EditSubunit = () =>{
        

    const t = useTranslate();

    const apiUrl = useApiUrl();

    const usersData = queryResult?.data?.data;

    const {autocompleteProps: organizationAutocompleteProps} =
        useAutocomplete<IOrganization>({
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

            // defaultValue:
            //     usersData?.organization.id == null
            //         ? null
            //         : queryResult?.data?.data.organization.id,
        });

    const handleOnSubmit = (data: ISubunit) => {
        const subunit: IUpdateSubunit = {
            name: data.name,
            title: `${data.name} (${data.organization.title})`,
            color_subunit: data.color_subunit,
            organization_id: data.organization.id,
            is_active: data.is_active,
        };
        // @ts-ignore
        onFinish(subunit);
    };

    return (
        <Drawer
            sx={{zIndex: "1301"}}
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}
            open={visible}
            onClose={close}
            anchor="right"
        >
            <Edit
                headerProps={{
                    avatar: (
                        <IconButton
                            onClick={() => close()}
                            sx={{width: "30px", height: "30px", mb: "5px"}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    ),
                    action: null,
                }}
                wrapperProps={{sx: {overflowY: "scroll", height: "100vh"}}}
                saveButtonProps={{
                    type: 'submit',
                }}
            >
                <Stack>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            //alignItems:'center',
                            marginBottom:"50px"
                    }}
                        autoComplete="off"
                    >
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <TextField
                                {...register('title', )}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                type="text"
                                label={t('subunits.fields.fullname')}
                                name="fullname"
                            />

                            <TextField
                                {...register('name',)}
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
                                                organizationAutocompleteProps?.options?.find(
                                                    (p) => p.id === item.id
                                                )?.title ?? ''
                                            );
                                        }}
                                        isOptionEqualToValue={(option, value) => {
                                            console.log(value)
                                            return value === undefined ||
                                                option.id.toString() ===
                                                value.id.toString()
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
                        </form>
                    </Box>
                </Stack>
            </Edit>
        </Drawer>
    );
};
