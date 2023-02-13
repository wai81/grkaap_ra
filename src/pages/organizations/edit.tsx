import {Edit, Box, TextField, FormControlLabel, Switch} from "@pankod/refine-mui";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {useTranslate} from "@pankod/refine-core";

export const OrganizationEdit = () => {
    const {
        saveButtonProps,
        refineCore: { queryResult },
        register,
        control,
        formState: { errors },
    } = useForm();
    const t = useTranslate();
    const organizationsData = queryResult?.data?.data;

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("id", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.id}
                    helperText={(errors as any)?.id?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label= {t('organizations.fields.id')}
                    name="id"
                />
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t('organizations.fields.name')}
                    name="name"
                />
                <TextField
                    {...register("fullname", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.fullname}
                    helperText={(errors as any)?.fullname?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t('organizations.fields.fullname')}
                    name="fullname"
                />
                <Controller
                    control={control}
                    name="is_active"
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({field}) => (
                        <FormControlLabel
                            label={t('organizations.fields.is_active')}
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
    );
};
