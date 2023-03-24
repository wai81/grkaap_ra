import React from 'react'
import {
    EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper
} from "../../StyledList";
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