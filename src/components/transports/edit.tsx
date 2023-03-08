import { CloseOutlined } from "@mui/icons-material";
import { HttpError, useTranslate } from "@pankod/refine-core";
import {
  Box,
  Drawer,
  Edit,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@pankod/refine-mui";
import {
  Controller,
  UseModalFormReturnType,
} from "@pankod/refine-react-hook-form";
import { IUpdateTransport } from "interfaces/ITransport";

export const EditTransportDrawer: React.FC<
  UseModalFormReturnType<IUpdateTransport, HttpError>
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
      <Edit
        saveButtonProps={saveButtonProps}
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
            variant="outlined"
            size={"small"}
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
    </Drawer>
  );
};
