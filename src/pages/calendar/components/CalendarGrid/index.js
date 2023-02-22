import React from "react";
import styled from "styled-components";
import CalendarGridHeader from "../CalendarGridHeader";
import MonthDayList from "../MonthDayList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${props => props.isHeader ? '#1E1F21' : '#404040'};
  grid-gap: 1px;
  ${props => props.isHeader && 'border-bottom: 1px solid #404040'};
  border-bottom: 2px solid #3f4140;
 `;

const CalendarGrid = ({startDay, today, totalDays, events,setDisplayMode, openModalFormHandler}) => {
    return(
    <>
        <GridWrapper isHeader>
          <CalendarGridHeader/>
        </GridWrapper>
        <GridWrapper>
          <MonthDayList openModalFormHandler={openModalFormHandler} startDay={startDay} totalDays={totalDays} events={events} today={today} setDisplayMode={setDisplayMode}/>
        </GridWrapper>
    </>
    )
}
export default CalendarGrid