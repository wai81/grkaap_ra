import React, {useEffect, useRef, useState} from 'react'
import {isDayContainCurrentEvent, isDayContainCurrentTimestamp} from "../../Helpers/Functions";
import styled from "styled-components";
import {
    ButtonsWrapper,
    ButtonWrapper, ButtonWrapperForms,
    EventBody, EventItemButtonWrapper,
    EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    EventTitle
} from "../../StyledList";
import {ITEMS_PER_DAY, ONE_SECOND} from "../../Helpers/Constants";
import moment from "moment";
import {eventMapper} from "../../Helpers/Mapper/eventMapper";

const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  padding: 1px;
  top: ${props => props.top}px;
`;

const EventsListWrapper = styled('div')`
  background-color: #1E1F21;
  color: #DDDDDD;
  flex-grow: 1;
`;
const EventFormWrapper = styled('div')`
  background-color: #27282A;
  color: #DDDDDD;
  width: 280px;
  position: relative;
  border-left: 1px solid #464648;
`;
const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;
const SelectedItemList = styled('div')`
  padding: 15px;
`;
const ScaleWrapper= styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  position: relative;
`;
const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  margin-left: 32px;
  &:not(:last-child){
    border-bottom: 1px solid #464648;
  }
`;
const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;
const ScaleCellEventWrapper = styled('div')`
  min-height: 16px;
`;
const SelectEventTimeWrapper= styled('div')`
  padding: 8px 14px;
  border-bottom: 1px solid #464648;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ListOfHours = styled('ul')`
  margin: 0;
  padding: 5px;
  height: 160px;
  width: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 0px;
  background-color: rgb(239,239,239);
  z-index: 100 ;
`;
const PositionRelative = styled('div')`
  position: relative;
`;
const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
`;
const RedLine = styled('div')`
  background-color: red;
  height: 2px;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  top: ${props => props.position}%;
`;


const DayShowComponent = ({events, selectedEvent, today, updateEventByDragAndDrop, cancelButtonHandler,eventFetchHandler,removeEventHandler,changeEventHandler,method, openFormHandler }) => {

    const [widthDiv, setWidthDiv] = useState(0);
    const [eventMap, setEventMap] = useState([]);
    const [heightDiv, setHeightDiv] = useState(0);
    const [droppedHour, setDroppedHour] = useState(null);

    const ref = useRef(null);
    useEffect(()=>{
        const eventList = events.filter(event => isDayContainCurrentEvent(event, today));

        const map = eventMapper(eventList);
        const tempArr = [];
        map.forEach((column, rank) =>{
            column.forEach((event)=>{
                tempArr.push({...event, rank})
            })
        });
        setEventMap(tempArr);
        setHeightDiv(ref.current.clientHeight / ITEMS_PER_DAY);
        setWidthDiv((ref.current.clientWidth -70) / map.size);
    },[events]);

    const onDragEndHandler = (e,event) =>{
        const date = moment.unix(+event.date).hour(droppedHour).format('X')
        updateEventByDragAndDrop({...event, date})
    }
    const onDropHandler = (e,i) => {
        e.preventDefault();
        setDroppedHour(i);
    }
    const onDragOverHandler=( e) => {
        e.preventDefault()
    }
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showDurationPicker, setShowDurationPicker] = useState(false);
    const getTopPosition = (event) =>{
        return heightDiv * +moment.unix(+event.date).format('H')
    }
    const cells = [...new Array(ITEMS_PER_DAY)].map((_,i)=>{
        }
    );
    const setTimeForEvent = (i) =>{
        setShowTimePicker(false);
        const time = moment.unix(+selectedEvent.date).hour(i).format('X')
        changeEventHandler(time, 'date')
    };
    const setDurationForEvent = (i) =>{
        setShowDurationPicker(false);
        changeEventHandler(i, 'duration')
    };

    const getRedLinePosition = () => ((moment().format('X') - today.format('X')) / 86400) * 100 ;

    const [, setCounter] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => {
         setCounter(prevState => prevState + 1);
    }, ONE_SECOND);
        return () => clearInterval(timerId);
    },[]);

        return (
            <DayShowWrapper>
                <EventsListWrapper>
                    <ScaleWrapper ref={ref}>
                        {
                            isDayContainCurrentTimestamp(moment().format('X'), today) ? (
                                <RedLine position={getRedLinePosition()}/>
                            ):null
                        }
                        {/*сетка шкала времени*/}
                        {
                            cells.map((eventsList,i) => (
                                <ScaleCellWrapper
                                     onDrop={(e) => onDropHandler(e,i)}
                                     onDragOver={onDragOverHandler}
                                >
                                    <ScaleCellTimeWrapper>
                                        {
                                            i ? (
                                                <>
                                                    {`${i}`.padStart(2,'0')}:00
                                                </>
                                            ) :null
                                        }
                                    </ScaleCellTimeWrapper>
                                    <ScaleCellEventWrapper/>
                                </ScaleCellWrapper>
                            ))
                        }
                        {/*вывод событие*/}
                        {
                            eventMap.map((event , i) => (
                                <EventItemButtonWrapper  onClick={() => openFormHandler('Изменить',event)}
                                                         left={37 + (widthDiv +5)*event.rank} w={widthDiv-2}
                                                         h={heightDiv*event.duration.toFixed(0)-3}
                                                         top={getTopPosition(event) + 1}
                                                         draggable={true}
                                                         onDragEnd={(e)=>onDragEndHandler(e, event)}

                                >
                                 Название:   {event.title}
                                    <p>Описание:{event.description}</p>
                                </EventItemButtonWrapper>
                            ))
                        }
                        {/*вывод событие*/}
                    </ScaleWrapper>
                </EventsListWrapper>
                <EventFormWrapper>

                    {/*форма изменения выбранного события*/}
                    {
                        selectedEvent ? (
                            <SelectedItemList>
                                <div>
                                    <EventTitle
                                    onChange={e => changeEventHandler(e.target.value, 'title')}
                                    value={selectedEvent.title}
                                    placeholder="Введите название..."
                                    maxLength={30}
                                    />
                                    <SelectEventTimeWrapper>
                                        <PositionRelative>
                                            <ButtonWrapperForms>
                                            {
                                                moment.unix(+selectedEvent.date).format('dddd, D MMMM')
                                            }

                                            </ButtonWrapperForms>
                                        </PositionRelative>
                                       <PositionRelative>
                                           <ButtonWrapperForms onClick={() => setShowTimePicker(prevState => !prevState)}>
                                              Начало
                                               <p> {
                                                   moment.unix(+selectedEvent.date).format('HH:mm')
                                               }</p>
                                           </ButtonWrapperForms>
                                           {
                                               showTimePicker ? (
                                                   <ListOfHours>
                                                       {
                                                           [... new Array(ITEMS_PER_DAY)].map((_, i) =>(
                                                               <li>
                                                                   <HoursButton onClick={()=>setTimeForEvent(i)}>
                                                                       {`${i}`.padStart(2,'0')}:00
                                                                   </HoursButton>
                                                               </li>
                                                           ))
                                                       }
                                                   </ListOfHours>
                                               ): null
                                           }
                                       </PositionRelative>


                                        <PositionRelative>
                                            <ButtonWrapperForms onClick={() => setShowDurationPicker(prevState => !prevState)}>
                                                Длительность
                                                <p> {
                                                    `${selectedEvent.duration}`.padStart(2, '0')
                                                }:00</p>
                                            </ButtonWrapperForms>
                                            {
                                                showDurationPicker ? (
                                                    <ListOfHours>
                                                        {
                                                            [... new Array(ITEMS_PER_DAY)].map((_, i) =>(
                                                                <li>
                                                                    <HoursButton onClick={()=>setDurationForEvent(i + 1)}>
                                                                        {`${i + 1 }`.padStart(2,'0')}:00
                                                                    </HoursButton>
                                                                </li>
                                                            ))
                                                        }
                                                    </ListOfHours>
                                                ): null
                                            }
                                        </PositionRelative>


                                    </SelectEventTimeWrapper>
                                    <EventBody
                                        onChange={e => changeEventHandler(e.target.value, 'description')}
                                        value={selectedEvent.description}
                                        placeholder="Введите описание..."
                                        maxLength={250}/>
                                </div>
                                <ButtonsWrapper>
                                    <ButtonWrapper onClick={cancelButtonHandler}>Отмена</ButtonWrapper>
                                    <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                                    { method === 'Изменить' ? (<ButtonWrapper isSDelete onClick={removeEventHandler}>Удалить </ButtonWrapper>) : null }

                                </ButtonsWrapper>
                            </SelectedItemList>
                        ) : (
                            <NoEventMsg>No event selected</NoEventMsg>
                        )
                    }
                    {/*конец формы изменения выбранного события*/}
                </EventFormWrapper>
            </DayShowWrapper>
    )
}
export default DayShowComponent


