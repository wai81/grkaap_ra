import React from "react";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper,
    EventItemWrapper, EventListItemWrapper,
    EventListWrapper,
    RowInCell,
    ShowDayWrapper
} from "../../StyledList";
import {isCurrentDay, isSelectedMonth} from "../../Helpers/Functions";
import {DISPLAY_MODE_DAY} from "../../Helpers/Constants";

const CalendarCell = ({dayItem, today, openModalFormHandler,events,setDisplayMode}) => {
    return(
        <>
            <CellWrapper
                key={dayItem.unix()} isSelectedMonth={isSelectedMonth(dayItem, today)}
                isWeekend={dayItem.day() === 6 || dayItem.day() === 0 }
            >
                <RowInCell
                    justifyContent={'flex-end'}
                >
                    {/*текущий день*/}
                    <ShowDayWrapper>
                        <DayWrapper onDoubleClick={(e) => openModalFormHandler('Добавить', null, dayItem)}>
                            {
                                isCurrentDay(dayItem) ?(
                                    <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                ) : dayItem.format('D')
                            }
                        </DayWrapper>
                    </ShowDayWrapper>
                    {/*события*/}
                    <EventListWrapper>
                        {
                            events
                                .slice(0,2)
                                .map(event => (
                                <EventListItemWrapper key={event.id}>
                                    <EventItemWrapper onClick={(e) => openModalFormHandler('Изменить', event )}>
                                        {event.title}
                                    </EventItemWrapper>
                                </EventListItemWrapper>
                            ))
                        }
                        {/*событие больше*/}
                        {
                            events.length > 2 ? (
                                <EventListItemWrapper key="show more">
                                    <EventItemWrapper isMore onClick={()=> setDisplayMode(DISPLAY_MODE_DAY)}>
                                        больше...
                                    </EventItemWrapper>
                                </EventListItemWrapper>
                            ) : null
                        }
                    </EventListWrapper>
                </RowInCell>
            </CellWrapper>
        </>
    )
}
export default CalendarCell