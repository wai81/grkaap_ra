import {HttpError, useList, useTranslate} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
//import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
import ru from "@fullcalendar/core/locales/ru";
import {EventInput} from "@fullcalendar/core";
import {
    ICreateRegistrationAppointment,
    IRegistrationAppointment,
    IUpdateRegistrationAppointment
} from "../../interfaces/IRegistrationAppointment";
import {useModalForm} from "@refinedev/react-hook-form";

import {CreateRegistrationAppointmentsDrawer} from "../../components/registration_appointments";
import {EditRegistrationAppointmentsDrawer} from "../../components/registration_appointments/edit";
import {CreateButton, List} from "@refinedev/mui";

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

    const { data, isLoading, isError } = useList<IRegistrationAppointment, HttpError>({
        resource: "registration_appointment",
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
        noEventsInRange:"В этом диапазоне нет событий."
    };

    const myEvents = eventBooking.map((event)=>({
        id: event.id,
        start: event.startDate,
        end: event.endDate,
        allDay: false,
        title: `${event.executor} ${event.subunit?.name}`
    }));

    const createDrawerFormProps = useModalForm<ICreateRegistrationAppointment, HttpError>({
        refineCoreProps: {action: "create"},
        modalProps: {
            autoResetForm: true,
        }
    });
    const {
        modal: {show: showCreateDrawer},
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IUpdateRegistrationAppointment, HttpError>({
        refineCoreProps: {action: "edit"},
    });
    const {
        modal: {show: showEditDrawer},
    } = editDrawerFormProps;

    // const INITIAL_EVENTS: EventInput[] = eventBooking.map((event) =>({
    //     id: event.id,
    //     start: event.startDate,
    //     end: event.endDate,
    //
    //     allDay: event.allDay,
    //     title: `${event.title} ${event.subunit.name} ${event.transport==null? '': event.transport.title}`
    // }))
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
        <List
            headerButtons={() =>(
                <>
                    <CreateButton hidden={true}/>
                </>
            )}
        >
            <CreateRegistrationAppointmentsDrawer {...createDrawerFormProps} />
            <EditRegistrationAppointmentsDrawer {...editDrawerFormProps} />
            <Calendar
                messages={messages}
                className="calendar"
                localizer={localizer}
                events={myEvents}
                onSelectEvent={(event)=>showEditDrawer(event.id)}
                onSelectSlot={()=>showCreateDrawer()}
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
                //popup
                selectable
                style={{ height: "800px"}}
            />
        </List>
    )
};
