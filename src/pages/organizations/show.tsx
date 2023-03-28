import { useShow, useTranslate } from "@refinedev/core";
import { Show, NumberField, TextFieldComponent as TextField, DateField } from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const OrganizationShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const t = useTranslate();

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t('organizations.fields.id')}
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    {t('organizations.fields.title')}
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    {t('organizations.fields.fullname')}
                </Typography>
                <TextField value={record?.fullname} />
                <Typography variant="body1" fontWeight="bold">
                    {t('organizations.fields.created_at')}
                </Typography>
                <DateField value={record?.created_at} format={"DD.MM.YYYY"} />
            </Stack>
        </Show>
    );
};
