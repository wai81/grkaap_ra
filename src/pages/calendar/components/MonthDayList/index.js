import React from 'react'
import CalendarCell from "../CalendarCell";
import {isDayContainCurrentEvent} from "../../Helpers/Functions";


const MonthDayList = ({startDay, today, totalDays, events,setDisplayMode,openModalFormHandler}) => {
    const day = startDay.clone().subtract(1, 'day')
    const daysMap = [...Array(totalDays)].map(()=> day.add(1, 'day').clone());
    return(
        <>
            {
                daysMap.map((dayItem) => (
                    <CalendarCell events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
                                  dayItem={dayItem} today={today} openModalFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode}/>
                ))
            }
        </>
    )
}


export default MonthDayList