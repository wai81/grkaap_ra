import React, {useEffect, useState} from 'react'
import moment from "moment";
import Header from "../../components/calendar/Header";
import Monitor from "../../components/calendar/Monitor";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import styled from "styled-components";
import {
    DISPLAY_MODE_DAY,
    DISPLAY_MODE_MONTH,
    DISPLAY_MODE_WEEK, TOTAL_DAYS
} from "../../components/calendar/Helpers/Constants";
import DayShowComponent from "./DayShowComponent";
import WeekShowComponent from "./WeekShowComponent";
import {
    ButtonsWrapper,
    ButtonWrapper,
    CurrentDay,
    EventBody,
    EventTitle,
    TextWrapper,
    TitleWrapper
} from "./StyledList";
import 'moment/locale/ru'
import {Card, CardContent, CardHeader} from "@pankod/refine-mui";

const totalDays = TOTAL_DAYS;

export const CalendarShow = ({url}) => {
    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH)
    moment.updateLocale('ru', {week: {dow: 1}});
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    // const endDay = moment().endOf('month').endOf('week');

    window.moment = moment;

    const prevHandler = () => {
        setToday(prev => prev.clone().subtract(1, displayMode))
    }
    const todayHandler = () => {
        setToday(moment())
    }
    const nextHandler = () => {
        setToday(prev => prev.clone().add(1, displayMode))
    }

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [isShowForm, setShowForm] = useState(false)
    const [method, setMethod] = useState(null)

    const startDayQuery = startDay.clone().format('YYYY-MM-DD hh:mm:ss');
    const endDayQuery = startDay.clone().add(totalDays, 'day').format('YYYY-MM-DD hh:mm:ss')

    useEffect(() => {
        fetch(`${url}/?order_by=-startDate&page=1&size=100&startDate_gte=${startDayQuery}&startDate_lte=${endDayQuery}`)
            .then(res => res.json())
            .then(res => setEvents(res.items));
    }, [today]);

    return (
        <Card>
            <CardHeader title={"Календарь"}/>
            <CardContent sx={{pt: 0}}>
                <Monitor
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                    today={today}
                    setDisplayMode={setDisplayMode}
                    displayMode={displayMode}
                />
                {
                    displayMode === DISPLAY_MODE_MONTH ? (

                        <CalendarGrid startDay={startDay}
                                      today={today}
                                      totalDays={totalDays}
                                      events={events}
                                      setDisplayMode={setDisplayMode}/>
                    ) : null
                }
                {
                    displayMode === DISPLAY_MODE_WEEK ? (
                        <WeekShowComponent key='id' events={events}
                                           today={today}
                                           startDay={startDay}
                        />
                    ) : null
                }
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <DayShowComponent events={events}
                                          today={today}
                                          totalDays={totalDays}
                                          selectedEvent={event}
                                          setEvent={setEvent}
                                          method={method}
                                          key='day_show'
                        />
                    ) : null

                }
            </CardContent>
        </Card>
    )
}

export default CalendarShow
