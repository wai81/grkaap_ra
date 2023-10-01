import {HttpError, useList, useTranslate} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
//import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Card, CardContent, CardHeader} from "@mui/material";
import React, { useState } from "react";
import { IBookingTransport } from "interfaces/IBookingTransport";

const localizer = momentLocalizer(moment)

export const RegistrationAppointmentList: React.FC = () => {
    const t = useTranslate();
    const totalDays = 365;
    const [today, setToday] = useState(moment())
    
    const startDay = today.clone().startOf('year').startOf('week');
    const startDayQuery = startDay.clone().format('YYYY-MM-DD hh:mm:ss');
    const endDayQuery = startDay.clone().add(totalDays, 'day').format('YYYY-MM-DD hh:mm:ss')
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(100);

    const { data, isLoading, isError } = useList<IBookingTransport, HttpError>({
        resource: "booking_transport",
        pagination: {
            current,
            pageSize,
        },
        filters: [
            {
                field: 'startDate',
                operator: 'gte',
                value: startDayQuery
            },
            {
                field: 'endDate',
                operator: 'lte',
                value: endDayQuery
            }
        ]
    });
    
    const eventBooking = data?.data ?? [];
    
    //console.log(eventBooking)

    const messages = {
        allDay: "Весь день",
        previous: "Назад",
        next: "Вперед",
        today: "Сегодня",
        month: "Месяц",
        week: "Неделя",
        work_week: 'Рабочая неделя',
        day: "День",
        agenda: "Список событий",
        date: "Дата",
        time: "Время",
        event: "Событие",
        showMore: (total: number) => `+ ${total} подробнее`,
    };

    const myEvents = eventBooking.map((event)=>({

        start: event.startDate,
        end: event.endDate,
        allDay: event.allDay,
        title: `${event.title} ${event.subunit.name} ${event.transport==null? '': event.transport.title}`
    }));
    // const myEvents = [{
    //     start: '2023-10-02T08:00:00',
    //     end: '2023-10-02T09:00:00',
    //     allDay: false,
    //     title: 'React1',
    // },
    // {
    //     start: '2023-10-02T08:00:00',
    //     end: '2023-10-02T09:00:00',
    //     allDay: false,
    //     title: 'React2',
    // },
    // {
    //     start: '2023-10-02T09:30:00',
    //     end: '2023-10-02T10:30:00',
    //     allDay: false,
    //     title: 'React3',
    // },
    // {
    //     start: '2023-10-02T09:00:00',
    //     end: '2023-10-02T10:00:00',
    //     allDay: false,
    //     title: 'React3',
    // }]
    //console.log(myEvents)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }
    return(
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
            <CardHeader title={t("filter.title")} />
            <CardContent sx={{ pt: 0}}>
            <Calendar
                messages={messages}
                //className="calendar"
                localizer={localizer}
                events={myEvents}
                startAccessor={(event: any) => {
                    return moment(event.start).toDate();
                }}
                endAccessor={(event: any) => {
                    return moment(event.end).toDate();
                }}
                titleAccessor={(event: any) => {
                    return event.title;
                }}
                allDayAccessor={(event: any) => {
                    return event.allDay === true;
                }}
                min={moment().startOf('day').toDate()}
                max={moment().endOf('day').toDate()}
                defaultDate={moment().toDate()}
                style={{ height: "700px"}}
            />

            </CardContent>
        </Card>
    )
};
