import {useOne, useShow} from "@pankod/refine-core";
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
                    Username
                </Typography>
                <TextField value={record?.username} />
                <Typography variant="body1" fontWeight="bold">
                    Last Name
                </Typography>
                <TextField value={record?.last_name} />
                <Typography variant="body1" fontWeight="bold">
                    First Name
                </Typography>
                <TextField value={record?.first_name} />
                <Typography variant="body1" fontWeight="bold">
                    Patronymic
                </Typography>
                <TextField value={record?.patronymic} />
                <Typography variant="body1" fontWeight="bold">
                    Is Superuser
                </Typography>
                <BooleanField value={record?.is_superuser} />
                <Typography variant="body1" fontWeight="bold">
                    Is Active
                </Typography>
                <BooleanField value={record?.is_active} />
                <Typography variant="body1" fontWeight="bold">
                    Organization
                </Typography>
                {organizationIsLoading ? (
                    <>Loading...</>
                ) : (
                    <>{organizationData?.data?.name}</>
                )}
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.created_at} />
            </Stack>
        </Show>
    );
};
