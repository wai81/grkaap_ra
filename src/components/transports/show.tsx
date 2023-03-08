import { CloseOutlined } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { HttpError, useShow, useTranslate } from "@pankod/refine-core";
import {
  BooleanField,
  Box,
  DateField,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Show,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { ITransport } from "interfaces/ITransport";
import moment from "moment";

export const ShowTransportDrawer: React.FC<
  UseModalFormReturnType<ITransport, HttpError>
> = ({
  watch,
  setValue,
  register,
  formState: { errors },
  control,
  refineCore: { onFinish, formLoading },
  handleSubmit,
  modal: { visible, close },
  saveButtonProps,
  getValues,
}) => {
  const t = useTranslate();

  return (
    <Drawer
      open={visible}
      onClose={close}
      anchor="right"
      PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
    >
      <Show
        cardHeaderProps={{
          action: (
            <IconButton
              onClick={() => close()}
              sx={{ width: "30px", height: "30px" }}
            >
              <CloseOutlined />
            </IconButton>
          ),
          avatar: null,
        }}
        cardProps={{ sx: { overflowY: "scroll", height: "100vh" } }}
        breadcrumb={""}
      >
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        ></Box>
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
          variant="outlined"
          size={"small"}
          disabled
        />
        <TextField
          {...register("description")}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={t("transports.fields.details")}
          name="description"
          variant="outlined"
          size={"small"}
          multiline
          minRows={2}
          maxRows={2}
          disabled
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
                  disabled
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={t("transports.fields.status.disable")}
                  disabled
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        <Controller
          control={control}
          name="startDate"
          // eslint-disable-next-line
          defaultValue={moment()}
          render={({ field }) => (

            <DateTimePicker
              {...field}
              //inputFormat="DD.MM.YYYY hh:mm"
              //ampm={false}
              disabled
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("transports.fields.created_at")}
                  margin="normal"
                  variant="outlined"
                  size={"small"}
                />
              )}
            />
          )}
        />
      </Show>
    </Drawer>
  );
};
