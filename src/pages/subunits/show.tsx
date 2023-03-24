import { useOne, useShow, useTranslate } from "@refinedev/core";
import { BooleanField, DateField, Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { Stack, Typography } from "@mui/material";


export const SubunitShow = () => {
    const {queryResult} = useShow();
    const {data, isLoading} = queryResult;
    const t = useTranslate();
    const record = data?.data;

    const {data: organizationData, isLoading: organizationIsLoading} = useOne({
        resource: 'organizations',
        id: record?.organization?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {t('subunits.fields.fullname')}
                </Typography>
                <TextField value={record?.fullname}/>

                <Typography variant="body1" fontWeight="bold">
                    {t('subunits.fields.name')}
                </Typography>
                <TextField value={record?.name}/>

                <Typography variant="body1" fontWeight="bold">
                    {t('subunits.fields.organization.title')}
                </Typography>
                {organizationIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{organizationData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    {t('subunits.fields.is_active')}
                </Typography>
                <BooleanField value={record?.is_active} />
                <Typography variant="body1" fontWeight="bold">
                    {t('subunits.fields.created_at')}
                </Typography>
                <DateField value={record?.created_at} format={"DD.MM.YYYY"}/>
            </Stack>
        </Show>
    );
};
