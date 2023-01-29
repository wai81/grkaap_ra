import { useShow } from "@pankod/refine-core";
import {
    Show,
    Typography,
    Stack,
    NumberField,
    TextFieldComponent as TextField,
    DateField,
} from "@pankod/refine-mui";

export const OrganizationShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <Typography variant="body1" fontWeight="bold">
                    Fullname
                </Typography>
                <TextField value={record?.fullname} />
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.created_at} />
            </Stack>
        </Show>
    );
};
