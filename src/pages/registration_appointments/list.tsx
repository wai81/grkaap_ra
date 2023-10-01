import {useTranslate} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
//import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Card, CardContent, CardHeader} from "@mui/material";
import React from "react";

const localizer = momentLocalizer(moment)

export const RegistrationAppointmentList: React.FC = () => {
    const t = useTranslate();
    
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

    const myEvents = [{
        start: '2023-10-02T08:00:00',
        end: '2023-10-02T09:00:00',
        allDay: false,
        title: 'React1',
    },
    {
        start: '2023-10-02T08:00:00',
        end: '2023-10-02T09:00:00',
        allDay: false,
        title: 'React2',
    },
    {
        start: '2023-10-02T09:30:00',
        end: '2023-10-02T10:30:00',
        allDay: false,
        title: 'React3',
    },
    {
        start: '2023-10-02T09:00:00',
        end: '2023-10-02T10:00:00',
        allDay: false,
        title: 'React3',
    }]

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
