import {IResourceComponentsProps, useResource, useTranslate} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import 'moment/locale/ru';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Card, CardContent, CardHeader} from "@mui/material";
import React from "react";

const localizer = momentLocalizer(moment)

export const Registration_appointmentList: React.FC = () => {
    const t = useTranslate();

    const messages = {
        allDay: "Tous les jours",
        previous: "Précédent",
        next: "Suivant",
        today: "Aujourd'hui",
        month: "Mois",
        week: "Semaine",
        day: "Jour",
        agenda: "Agenda",
        date: "Date",
        time: "Heure",
        event: "Evenement",
    };

    return(
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
            <CardHeader title={t("filter.title")} />
            <CardContent sx={{ pt: 0}}>
            <Calendar
                //culture={i18n.language}
                className="calendar"
                localizer={localizer}
                events={[
                    {
                        start: '2023-09-17T16:00:00.000Z',
                        end: '2023-09-18T16:00:00.000Z',
                        allDay: false,
                        title: 'React',
                    },
                ]}
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
