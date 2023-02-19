import {
  HttpError,
  useTranslate,
} from "@pankod/refine-core";
//import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { IUpdateTransport } from "../../interfaces/ITransport";
import {
  Box,
  Edit,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@pankod/refine-mui";

export const TransportEdit = () => {
  const {
    saveButtonProps,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm<IUpdateTransport, HttpError, IUpdateTransport>();
  const t = useTranslate();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
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
          label={t("transports.fields.title")}
          name="title"
        />
        <TextField
          {...register("details")}
          error={!!(errors as any)?.details}
          helperText={(errors as any)?.details?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={t("transports.fields.details")}
          name="details"
          multiline
          minRows={2}
          maxRows={2}
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
            {t("transports.fields.is_active")}
          </FormLabel>
          <Controller
            control={control}
            name="is_active"
            // eslint-disable-next-line
            defaultValue={true}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={(event) => {
                  const value = event.target.value === "true";

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
                  label={t("transports.fields.status.enable")}
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={t("transports.fields.status.disable")}
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Box>
    </Edit>
  );
};
