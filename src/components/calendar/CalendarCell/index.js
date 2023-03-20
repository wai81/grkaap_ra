import React from "react";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper,
    EventItemWrapper, EventListItemWrapper,
    EventListWrapper,
    RowInCell,
    ShowDayWrapper
} from "../StyledList";
import {isCurrentDay, isSelectedMonth} from "../Helpers/Functions";
import {DISPLAY_MODE_DAY} from "../Helpers/Constants";
import {Badge} from "@pankod/refine-mui";
import {CreateBookingTransportDrawer, EditBookingTransportDrawer} from "../../booking_transports";
import {useModalForm} from "@pankod/refine-react-hook-form";

import {HttpError} from "@pankod/refine-core";
import {IUpdateBookingTransport} from "../../../interfaces/IBookingTransport";

const CalendarCell = ({dayItem, today,events,setDisplayMode}) => {

    const createDrawerFormProps = useModalForm({
        refineCoreProps: { action: "create" },
        defaultValues: {
            startDate: dayItem,
        }
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm({
        refineCoreProps: { action: "edit" },
    });
    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

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
                        {/*<DayWrapper onDoubleClick={(e) => openModalFormHandler('Добавить', null, dayItem)}>*/}
                        <DayWrapper onDoubleClick={(e) => showCreateDrawer(dayItem)}>
                            {
                                isCurrentDay(dayItem) ?(
                                    <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                ) : dayItem.format('D')
                            }

                        </DayWrapper>
                        {/*<Badge badgeContent={events.length}*/}
                        {/*                    anchorOrigin={{*/}

                        {/*                        vertical: 'bottom',*/}
                        {/*                        horizontal: 'left',*/}
                        {/*                    }}*/}
                        {/*                    color='warning'/>*/}
                    </ShowDayWrapper>

                    {/*события*/}
                    <EventListWrapper>

                        {
                            events
                                .slice(0,2)
                                .map(event => (
                                <EventListItemWrapper key={event.id}>
                                    <EventItemWrapper title={event.title} onClick={(e) => showEditDrawer(event.id)}>
                                        {/*openModalFormHandler('Изменить', event )}>*/}
                                        {event.title}
                                    </EventItemWrapper>
                                </EventListItemWrapper>
                            ))
                        }
                        {/*событие больше*/}

                        {
                            events.length > 2 ? (
                                <EventListItemWrapper key="show more">
                                    <EventItemWrapper isMore onClick={()=> {setDisplayMode(DISPLAY_MODE_DAY)
                                                                            today={dayItem}}}>
                                        +{events.length-2} ...
                                    </EventItemWrapper>
                                </EventListItemWrapper>
                            ) : null
                        }
                    </EventListWrapper>
                </RowInCell>
            </CellWrapper>
            <CreateBookingTransportDrawer {...createDrawerFormProps} />
            <EditBookingTransportDrawer {...editDrawerFormProps} />
        </>
    )
}
export default CalendarCell