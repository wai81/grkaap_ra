import {useOne, useShow, useTranslate} from "@pankod/refine-core";
import {
    Show,
    Typography,
    Stack,
    TextFieldComponent as TextField,
    BooleanField,
    DateField,
} from "@pankod/refine-mui";

export const UserShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

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
                    {t('users.fields.username')}
                </Typography>
                <TextField value={record?.username} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.last_name')}
                </Typography>
                <TextField value={record?.last_name} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.first_name')}
                </Typography>
                <TextField value={record?.first_name} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.patronymic')}
                </Typography>
                <TextField value={record?.patronymic} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.is_superuser')}
                </Typography>
                <BooleanField value={record?.is_superuser} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.is_active')}
                </Typography>
                <BooleanField value={record?.is_active} />
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.organization.title')}
                </Typography>
                {organizationIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{organizationData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    {t('users.fields.created_at')}
                </Typography>
                <DateField value={record?.created_at} />
            </Stack>
        </Show>
    );
};
