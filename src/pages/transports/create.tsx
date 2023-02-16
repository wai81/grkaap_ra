import {HttpError, useTranslate} from "@pankod/refine-core";
//import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import {useForm} from "@pankod/refine-react-hook-form";
import {Box, Create, TextField} from "@pankod/refine-mui";
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
                    {...register("details",)}
                    error={!!(errors as any)?.details}
                    helperText={(errors as any)?.details?.message}
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
