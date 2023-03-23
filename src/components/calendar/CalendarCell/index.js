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
import {Badge, Stack} from "@pankod/refine-mui";
import {CreateBookingTransportDrawer, EditBookingTransportDrawer} from "../../booking_transports";
import {useModalForm} from "@pankod/refine-react-hook-form";

import {HttpError} from "@pankod/refine-core";
import {IUpdateBookingTransport} from "../../../interfaces/IBookingTransport";
import {CustomTooltip} from "../../customTooltip";
import moment from "moment";

const CalendarCell = ({dayItem, today, events, setDisplayMode}) => {

    const createDrawerFormProps = useModalForm({
        refineCoreProps: {action: "create"},
        defaultValues: {
            startDate: dayItem,
        }
    });
    const {
        modal: {show: showCreateDrawer},
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm({
        refineCoreProps: {action: "edit"},
    });
    const {
        modal: {show: showEditDrawer},
    } = editDrawerFormProps;

    return (
        <>
            <CellWrapper
                key={dayItem.unix()} isSelectedMonth={isSelectedMonth(dayItem, today)}
                isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            >
                <RowInCell
                    justifyContent={'flex-end'}
                >
                    {/*текущий день*/}

                    <ShowDayWrapper>
                        <DayWrapper onDoubleClick={(e) => showCreateDrawer(dayItem)}>
                            {
                                isCurrentDay(dayItem) ? (
                                    <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                ) : dayItem.format('D')
                            }

                        </DayWrapper>
                    </ShowDayWrapper>

                    {/*события*/}
                    <EventListWrapper>

                        {
                            events
                                .slice(0, 2).map((event) => (
                                    <EventListItemWrapper key={event.id}>
                                        <CustomTooltip arrow placement="top"
                                                       title={
                                                           <Stack sx={{padding: "2px"}}>
                                                               <table>
                                                                   <thead>
                                                                   <tr>
                                                                       <th>Время</th>
                                                                       <th>Заказ Адрес</th>
                                                                       <th>Подразделение</th>
                                                                   </tr>
                                                                   </thead>
                                                                   <tbody>
                                                                   <tr key={event.id}>
                                                                       <td>
                                                                           {moment(event.startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')}
                                                                       </td>
                                                                       <td>
                                                                           {event.title}
                                                                       </td>
                                                                       <td>
                                                                           {event.subunit.title}
                                                                       </td>
                                                                   </tr>
                                                                   </tbody>
                                                               </table>
                                                           </Stack>
                                                       }>
                                            <EventItemWrapper onClick={(e) => showEditDrawer(event.id)}>
                                                {/*openModalFormHandler('Изменить', event )}>*/}
                                                {event.title}
                                            </EventItemWrapper>
                                        </CustomTooltip>
                                    </EventListItemWrapper>
                            ))
                        }
                        {/*событие больше*/}
                        {
                            events.length > 2 ? (
                                <EventListItemWrapper key="show more">
                                    <CustomTooltip arrow placement="top"
                                                   title={
                                                       <Stack sx={{padding: "2px"}}>
                                                           <table >
                                                               <thead>
                                                               <tr>
                                                                   <th></th>
                                                                   <th>Время</th>
                                                                   <th>Заказ Адрес</th>
                                                                   <th>Подразделение</th>
                                                               </tr>
                                                               </thead>
                                                               <tbody>
                                                               {events.map((event,index) => (

                                                                   <tr key={event.id}>
                                                                       <td>
                                                                            {index+1}
                                                                       </td>
                                                                       <td>
                                                                           {moment(event.startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm')}
                                                                       </td>
                                                                       <td>
                                                                           {event.title}
                                                                       </td>
                                                                       <td>
                                                                           {event.subunit.title}
                                                                       </td>
                                                                   </tr>
                                                               ))}
                                                               </tbody>
                                                           </table>
                                                       </Stack>
                                                   }>
                                        <EventItemWrapper isMore
                                                          //onClick={() => {setDisplayMode(DISPLAY_MODE_DAY)}}
                                        >
                                            +{events.length - 2} еще
                                        </EventItemWrapper>
                                    </CustomTooltip>
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