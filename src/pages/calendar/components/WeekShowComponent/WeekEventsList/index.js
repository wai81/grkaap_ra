import React from 'react'
import {isCurrentDay, isDayContainCurrentEvent, isSelectedMonth} from "../../../Helpers/Functions";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper, EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    RowInCell,
    ShowDayWrapper
} from "../../../StyledList";
import {DISPLAY_MODE_DAY} from "../../../Helpers/Constants";
import styled from "styled-components";

const DayWrapperName = styled('div')`
display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
`;
const WeekEventsList = ({dayItem, today, events,daysMap,daysWeek}) => {
    return(

        <>
            <EventListWrapper>
                {
                    dayItem.format('DD MMMM')
                }
                {
                    events
                        .map(event => (
                            <EventListItemWrapper key={event.id}>
                                <EventItemWrapper >
                                    {event.title}
                                </EventItemWrapper>
                            </EventListItemWrapper>
                        ))
                }


            </EventListWrapper>
        </>
    )
}
export default WeekEventsList