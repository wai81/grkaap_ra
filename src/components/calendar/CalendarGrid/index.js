import React from "react";
import styled from "styled-components";
import CalendarGridHeader from "../CalendarGridHeader";
import MonthDayList from "../MonthDayList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${props => props.isHeader ? '#ffffff' : '#e3e3e3'};
  grid-gap: 1px;
  ${props => props.isHeader && 'border-bottom: 1px solid #e3e3e3'};
  //border-bottom: 1px solid #e3e3e3;
  border: 1px solid #e3e3e3;
  ${props => props.isHeader && 'height: 40px'};
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