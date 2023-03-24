import {
  useOne,
  useShow,
  useTranslate,
} from "@pankod/refine-core";
import {
  BooleanField,
  DateField,
  Show,
  Stack,
  Typography,
} from "@pankod/refine-mui";
import { IBookingTransport } from "interfaces/IBookingTransport";

export const Booking_transportShow = () => {
  const { queryResult } = useShow<IBookingTransport>();
  const { data, isLoading } = queryResult;
  const t = useTranslate();
  const record = data?.data;

  const { data: organizationData, isLoading: organizationIsLoading } = useOne({
    resource: "organizations",
    id: record?.organization?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: subunitsData, isLoading: subunitsIsLoading } = useOne({
    resource: "subunits",
    id: record?.subunit?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: transportsData, isLoading: transportsIsLoading } = useOne({
    resource: "transports",
    id: record?.transport?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.title")}
        </Typography>
        {record?.title}
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.startDate")}
        </Typography>
        <DateField value={record?.startDate} format={"DD.MM.YYYY HH:mm"} />
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.duration")}
        </Typography>
        {record?.duration}:00
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.endDate")}
        </Typography>
        <DateField value={record?.endDate} format={"DD.MM.YYYY HH:mm"} />
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.allDay")}
        </Typography>
        <BooleanField value={record?.allDay} />
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.organization")}
        </Typography>
        {organizationIsLoading ? (
          <>Loading...</>
        ) : (
          <>{organizationData?.data?.title}</>
        )}
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.subunit")}
        </Typography>
        {subunitsIsLoading ? <>Loading...</> : <>{subunitsData?.data?.title}</>}
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.count_man")}
        </Typography>
        {record?.count_man}
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.description")}
        </Typography>
        {record?.description}
        <Typography variant="body1" fontWeight="bold">
          {t("booking_transport.fields.is_active")}
        </Typography>
        <BooleanField value={record?.is_active} />
      </Stack>
    </Show>
  );
};
