import { useApiUrl, useOne, useShow, useTranslate } from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  BooleanField,
  DateField,
} from "@refinedev/mui";
import { Typography, Stack, Grid, Avatar } from "@mui/material";

export const UserShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const t = useTranslate();
  const apiUrl = useApiUrl();
  const record = data?.data;

  const { data: organizationData, isLoading: organizationIsLoading } = useOne({
    resource: "organizations",
    id: record?.organization?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={4}>
        <Show isLoading={isLoading} goBack 
        title
        >
          <Stack alignItems="center" spacing={1}>
            <Avatar
              src={`${apiUrl}/${record?.avatar}`}
              sx={{ width: 120, height: 120 }}
            />
            <Typography variant="h6">
              {record?.last_name} {record?.first_name} {record?.patronymic}
            </Typography>
            <Typography variant="body2">
              {record?.username}
            </Typography>
          </Stack>
          <Stack spacing={1}>
            {/* <Typography variant="body1" fontWeight="bold">
              {t("users.fields.username")}
            </Typography>
            <TextField value={record?.username} /> */}
            {/* <Typography variant="body1" fontWeight="bold">
              {t("users.fields.is_superuser")}
            </Typography>
            <BooleanField value={record?.is_superuser} /> */}
            
            <Typography variant="body1" fontWeight="bold">
              {t("users.fields.organization.title")}
            </Typography>
            {organizationIsLoading ? (
              <>Loading...</>
            ) : (
              <>{organizationData?.data?.title}</>
            )}
            <Typography variant="body1" fontWeight="bold">
              {t("users.fields.is_active")}
            </Typography>
            <BooleanField value={record?.is_active} />
            <Typography variant="body1" fontWeight="bold">
              {t("users.fields.created_at")}
            </Typography>
            <DateField value={record?.created_at} format={"DD.MM.YYYY"} />
          </Stack>
        </Show>
      </Grid>
      <Grid item xs={12} md={12} lg={8}>
        
      </Grid>
    </Grid>
  );
};
