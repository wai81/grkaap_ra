import React from 'react'
import {DAYS_IN_WEEK, DISPLAY_MODE_DAY, WEEK_DAYS} from "../../Helpers/Constants";
import styled from "styled-components";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper, EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    RowInCell,
    ShowDayWrapper
} from "../../StyledList";
import moment from "moment";
import {isCurrentDay, isCurrentWeek, isDayContainCurrentEvent, isEventWeekListTime} from "../../Helpers/Functions";
import CalendarCell from "../CalendarCell";
import WeekEventsList from "./WeekEventsList";


const WeekWrapper = styled('div')`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  color: white;
  background-color: #1E1F21;
  grid-gap: 2px;
  min-height: 100%;
  
  
`;
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #404040;
  grid-gap: 1px;

  
 `;
const CellWeekWrapper = styled('div')`
  min-width: 20px;
  min-height: 10px;
  background-color: #404040;
  padding: 10px;
  text-align: end;
  display: flex;
  flex-direction: column;
  
`;
const DayWeekWrapper =styled(DayWrapper)`
  width: 100%;

`;

const EventTransportWrapper =styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`;
const WeekEventsWrapper =styled('div')`

`;
const DayEventWrapper = styled('div')`

`;
const DayWrapperName = styled('div')`
display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
`;

const WeekShowComponent = ({today, startDay, events}) => {
    const week = startDay.clone().subtract(1, 'week')
    const daysWeek = [...Array(WEEK_DAYS)].map(()=> week.add(1, 'week').clone());
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(DAYS_IN_WEEK)].map(()=> day.add(1, 'day').clone());

    return(
            <WeekWrapper >
                {
                    daysWeek.map(week => (
                        <div>
                            <DayWeekWrapper>
                                {week.startOf('week').format('DD MMMM, dddd')} - {week.endOf('week').format('DD MMMM, dddd')}
                            </DayWeekWrapper>
                            <GridWrapper>
                                {
                                    // daysMap.map(dayItem =>(
                                    //     <EventTransportWrapper>
                                    //         <WeekEventsList
                                    //             events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
                                    //             dayItem={dayItem} today={today}
                                    //             daysMap={daysMap}
                                    //             daysWeek={daysWeek}
                                    //         />
                                    //     </EventTransportWrapper>
                                    daysMap.map(dayItem =>(
                                        <EventTransportWrapper>
                                            <WeekEventsList
                                                events={events.filter(event => isDayContainCurrentEvent(event, dayItem))}
                                                dayItem={dayItem} today={today}
                                                daysMap={daysMap}
                                                daysWeek={daysWeek}
                                            />
                                        </EventTransportWrapper>

                                    ))
                                }

                            </GridWrapper>
                        </div>
                    ))
                }
            </WeekWrapper>


    )
}
export default WeekShowComponent