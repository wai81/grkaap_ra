import {Box, Edit, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@pankod/refine-mui";
import {Controller, useForm} from "@pankod/refine-react-hook-form";
import {useTranslate} from "@pankod/refine-core";

export const OrganizationEdit = () => {
    const {
        saveButtonProps,
        register,
        control,
        formState: { errors },
        setValue,
    } = useForm();
    const t = useTranslate();

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
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t('organizations.fields.title')}
                    name="title"
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
                {/*<Controller*/}
                {/*    control={control}*/}
                {/*    name="is_active"*/}
                {/*    // eslint-disable-next-line*/}
                {/*    defaultValue={null as any}*/}
                {/*    render={({field}) => (*/}
                {/*        <FormControlLabel*/}
                {/*            label={t('organizations.fields.is_active')}*/}
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
                        {t('organizations.fields.is_active')}
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
                                    label={t("organizations.fields.status.enable")}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio/>}
                                    label={t("organizations.fields.status.disable")}
                                />
                            </RadioGroup>
                        )}
                    />
                </FormControl>
            </Box>
        </Edit>
    );
};
