import { HttpError, useTranslate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import {ICreateTransport} from "../../interfaces/ITransport";


export const TransportCreate = () => {
    const {
        saveButtonProps,
        refineCore: {formLoading},
        register,
        formState: {errors},
    } = useForm<ICreateTransport, HttpError, ICreateTransport>();
    const t = useTranslate()
    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t('transports.fields.title')}
                    name="title"
                />
                <TextField
                    {...register("description",)}
                    error={!!(errors as any)?.description}
                    helperText={(errors as any)?.description?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label={t('transports.fields.details')}
                    name="details"
                    multiline
                    minRows={2}
                    maxRows={2}
                />
            </Box>
        </Create>
    );
};
