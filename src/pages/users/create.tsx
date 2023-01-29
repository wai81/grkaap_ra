import { HttpError } from "@pankod/refine-core/dist/interfaces";
import {
    Create,
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
    Autocomplete,
    useAutocomplete,
} from "@pankod/refine-mui";
import { useForm, Controller } from "@pankod/refine-react-hook-form";
import { IOrganization } from "interfaces/IOrganization";
import { ICreateUser } from "interfaces/IUser";

export const UserCreate = () => {
    const {
        saveButtonProps,
        handleSubmit,
        refineCore: { onFinish, formLoading },
        register,
        control,
        formState: { errors },
    } = useForm<ICreateUser, HttpError, ICreateUser & { organization_id: IOrganization}>();

    const { autocompleteProps } = useAutocomplete<IOrganization>({
        resource: "organizations",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <form onSubmit={handleSubmit(onFinish)}>
                <TextField
                    {...register("username", {
                        required: "This field is required",
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
                    {...register("last_name", {
                        required: "This field is required",
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
                    {...register("first_name", {
                        required: "This field is required",
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
                    {...register("patronymic", {
                        required: "This field is required",
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
                    name="organization_id"
                    rules={{ required: "This field is required" }}
                    // eslint-disable-next-line
                    defaultValue={null as any}
                    render={({ field }) => (
                        <Autocomplete
                            {...autocompleteProps}
                            {...field}
                            onChange={(_, value) => {
                                field.onChange(value);
                            }}
                            getOptionLabel={(item) => {
                                return (
                                    autocompleteProps?.options?.find(
                                        (p) =>
                                            p?.id?.toString() ===
                                            item?.id?.toString(),
                                    )?.name ?? ""
                                );
                            }}
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                option.id === value.id
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Organization"
                                    margin="normal"
                                    variant="outlined"
                                    error={
                                        !!(errors as any)?.organization?.name
                                    }
                                    helperText={
                                        (errors as any)?.organization?.name
                                            ?.message
                                    }
                                    required
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    {...register("password", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.password}
                    helperText={(errors as any)?.password?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="password"
                    label="Password"
                    name="password"
                />
                </form>
            </Box>
        </Create>
    );
};
