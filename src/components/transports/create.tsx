import { CloseOutlined } from "@mui/icons-material";
import { HttpError, useApiUrl, useTranslate } from "@pankod/refine-core";
import {
  Avatar,
  Box,
  Create,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import { UseModalFormReturnType } from "@pankod/refine-react-hook-form";
import axios from "axios";
import { url } from "inspector";
import { ICreateTransport } from "interfaces/ITransport";
import React from "react";

export const CreateTransportDrawer: React.FC<
  UseModalFormReturnType<ICreateTransport, HttpError>
> = ({
  watch,
  setValue,
  register,
  control,
  formState: { errors },
  refineCore: { onFinish, formLoading },
  modal: { visible, close },
  handleSubmit,
  saveButtonProps,
}) => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const imageInput = watch("images");

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();

    const target = event.target;
    const file: File = (target.files as FileList)[0];

    formData.append("image", file);
    

    const res = await axios.post<{ url: string }>(
      `${apiUrl}/transports/image`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    //const { name, size, type, lastModified } = file;
    console.log(res.data.url)  
    // eslint-disable-next-line
    const imagePaylod: any = [
      {
        // name,
        // size,
        // type,
        // lastModified,
        // url: res.data.url,
        filename: res.data.url,
      },
    ];
    
    setValue("image_url", res.data.url, { shouldValidate: true });
  };

  return (
    <Drawer
      open={visible}
      onClose={() => close()}
      anchor="right"
      PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
    >
      <Create
        saveButtonProps={saveButtonProps}
        headerProps={{
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
          //component="form"
          //autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <form onSubmit={handleSubmit(onFinish)}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel>{t("transports.fields.images.label")}</FormLabel>
              <Stack
                display="flex"
                alignItems="center"
                border="1px dashed  "
                borderColor="primary.main"
                borderRadius="5px"
                padding="10px"
                marginTop="5px"
              >
                <label htmlFor="images-input">
                  <Input
                    id="images-input"
                    type="file"
                    sx={{
                      display: "none",
                    }}
                    onChange={onChangeHandler}
                  />
                  <input
                    id="file"
                    {...register("image_url", {
                      required: t("errors.required.field", { field: "Image" }),
                    })}
                    type="hidden"
                  />
                  <Avatar
                    sx={{
                      cursor: "pointer",
                      width: {
                        xs: 100,
                        md: 180,
                      },
                      height: {
                        xs: 100,
                        md: 180,
                      },
                    }}
                    src={imageInput && imageInput[0].filename}
                    alt="Store Location"
                  />
                </label>
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: 800,
                    marginTop: "8px",
                  }}
                >
                  {t("products.fields.images.description")}
                </Typography>
                <Typography style={{ fontSize: "12px" }}>
                  {t("products.fields.images.validation")}
                </Typography>
              </Stack>
              {errors.image_url && (
                <FormHelperText error></FormHelperText>
              )}
            </FormControl>
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
          </form>
        </Box>
      </Create>
    </Drawer>
  );
};
