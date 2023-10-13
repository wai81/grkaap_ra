import {HttpError, useList, useTranslate} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Box, Card, CardContent, CardHeader, Grid, Stack, Typography} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import {
    ICreateRegistrationAppointment,
    IRegistrationAppointment,
    IUpdateRegistrationAppointment
} from "../../interfaces/IRegistrationAppointment";
import {useModalForm} from "@refinedev/react-hook-form";

import {CreateRegistrationAppointmentsDrawer} from "../../components/registration_appointments";
import {EditRegistrationAppointmentsDrawer} from "../../components/registration_appointments/edit";
import {CreateButton, List} from "@refinedev/mui";
import './calendar.css'
import {CustomTooltip} from "../../components/customTooltip";
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const localizer = momentLocalizer(moment)


export const RegistrationAppointmentList: React.FC = () => {
    const t = useTranslate();
    const [today, setToday] = useState(moment())

    const startDayQuery = today.clone().startOf('month').startOf('isoWeek').format('YYYY-MM-DD hh:mm:ss');
    const endDayQuery = today.clone().endOf('month').endOf('isoWeek').format('YYYY-MM-DD hh:mm:ss')
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const onNavigate = useCallback((newDate:any) => setToday(moment(newDate)), [setToday])

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
                field: 'startDate',
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
        start: moment(event.startDate).toDate(),
        end: moment(event.endDate).toDate(),
        data: { event },
    }));


    const onCreateNewEvent = useCallback((slot:any) => {
        showCreateDrawer()
    }, [])

    const createDrawerFormProps = useModalForm<ICreateRegistrationAppointment, HttpError>({

        refineCoreProps: {action: "create"},
        syncWithLocation: true,
        modalProps: {
            autoResetForm: true,
        },
        //  defaultValues:{
        //      startDate: startDayQuery,
        // }
    });
    const {
        modal: {show: showCreateDrawer},
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IUpdateRegistrationAppointment, HttpError>({
        refineCoreProps: {action: "edit"},
        syncWithLocation: true,
    });
    const {
        modal: {show: showEditDrawer},
    } = editDrawerFormProps;


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }


    const CustomEvent = (data:any)=>{
        const event = data.event?.data.event;
        const statusAppointment = event?.statusAppointment;
        const created_at = new Date(event.created_at);
        const cratedAt = moment(created_at,'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm');
        const startDate = new Date(event.startDate);
        const startEvent = moment(startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm');
        return (
            <div
                style={{ background:
                statusAppointment==='NEW'?'':
                statusAppointment==='APPOINTED'?'#9cefa1'
                :'#f3b0b0',
                borderRadius:'5px', color:'black'
            }}
            >
                <CustomTooltip arrow //placement="bottom-start"
                               title={<Stack sx={{padding: "2px"}}>
                                   <table width={"100%"}>
                                       <thead>
                                       <tr>
                                           <th style={{alignContent:"center", width:"20%"}}>Время</th>
                                           <th style={{alignContent:"center", width:"40%"}}>Регистратор</th>
                                           <th style={{alignContent:"center", width:"40%"}}>Заказчик</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr key={event.id}>
                                           <td style={{alignContent:"flex-start", width:"20%"}}>
                                               <AccessTimeIcon sx={{ fontSize: 12 }} /> {startEvent}
                                           </td>
                                           <td style={{alignContent:"flex-start", width:"40%"}}>
                                               <p style={{marginBottom:0}}>
                                                   <PersonIcon sx={{ fontSize: 12 }} /> {event.executor}
                                               </p>
                                               {event.subunit.title}
                                           </td>
                                           <td style={{alignContent:"flex-start", width:"40%"}}>
                                               <p style={{marginBottom:0}}>
                                                   <FaceIcon sx={{ fontSize:12 }}/> {event.costumerName}
                                               </p>
                                               <p style={{marginBottom:0}}>
                                                   <PhoneAndroidIcon sx={{ fontSize:12 }}/> {event.costumerContactPhone}
                                               </p>
                                               <LocationOnIcon sx={{ fontSize:12 }}/>{event.addressObject}
                                           </td>
                                       </tr>
                                       </tbody>
                                   </table>
                                   <Typography variant={"caption"} color="disabled" >
                                       <CalendarTodayIcon sx={{ fontSize: 12 }} color={"disabled"}/> {cratedAt} <PersonIcon sx={{ fontSize: 12 }} color={"disabled"} /> {event.creator.username}
                                   </Typography>
                               </Stack>}
                >
                    <Typography variant="body2" display="block" gutterBottom>
                        <PersonIcon sx={{ fontSize: 18 }} color={"disabled"}/> <b>{event.executor}</b> {event.typeRegistration}
                    </Typography>
                </CustomTooltip>
            </div>
        )
    }


    return(
        <List
            headerButtons={() =>(
                <>
                    <CreateButton onClick={()=>onCreateNewEvent}/>
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
                components={{
                    event: CustomEvent}}
                onSelectEvent={(event)=>showEditDrawer(event.id)}
                onSelectSlot={onCreateNewEvent}
                onNavigate = {onNavigate}
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
