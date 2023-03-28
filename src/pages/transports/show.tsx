import { useShow, useTranslate } from "@refinedev/core";
import { BooleanField, DateField, Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";

import {ITransport} from "../../interfaces/ITransport";

export const TransportShow = () => {
    const { queryResult } = useShow<ITransport>();
    const { data, isLoading } = queryResult;
    const t = useTranslate();

    const record = data?.data;
    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t('transports.fields.title')}
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    {t('transports.fields.details')}
                </Typography>
                <TextField value={record?.details} />
                <Typography variant="body1" fontWeight="bold">
                    {t('transports.fields.is_active')}
                </Typography>
                <BooleanField value={record?.is_active} />
                <Typography variant="body1" fontWeight="bold">
                    {t('transports.fields.created_at')}
                </Typography>
                <DateField value={record?.created_at} format={"DD.MM.YYYY"} />

            </Stack>
        </Show>
    )
};
