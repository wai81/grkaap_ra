import React, {useEffect, useState} from 'react'
import moment from "moment";
import Header from "./components/Header";
import Monitor from "./components/Monitor";
import CalendarGrid from "./components/CalendarGrid";
import styled from "styled-components";
import {
    DISPLAY_MODE_DAY,
    DISPLAY_MODE_MONTH,
    DISPLAY_MODE_WEEK
} from "./Helpers/Constants";
import DayShowComponent from "./components/DayShowComponent";
import WeekShowComponent from "./components/WeekShowComponent";
import {
    ButtonsWrapper,
    ButtonWrapper,
    CurrentDay,
    EventBody,
    EventTitle,
    TextWrapper,
    TitleWrapper
} from "./StyledList";
import 'moment/locale/ru'



const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #464648;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 1000px;
  min-height: 850px;
  background-color: #2a2b2d;
`;

const FormPositionWrapper= styled('div')`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormWrapper = styled(ShadowWrapper)`
    width: 420px;
   min-height: 300px;
   background-color: #1E1F21;
   color: #DDDDDD;
   box-shadow: unset;   
   padding: 15px;
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   flex-direction: column;
 `;
const DateWrapper=styled('div')`
  font-size: 18px;
  color: white;
`;


const url = 'http://localhost:5000';
const totalDays = 42;
const defaultEvent ={
    title:'',
    description:'',
    date: moment().format('DD MMM YYYY HH:mm'),
    duration:1,
}


const CalendarShow = () => {
    moment.locale('ru')


    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH)

    moment.updateLocale('ru', {week:{dow:1}});
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    // const endDay = moment().endOf('month').endOf('week');


    window.moment = moment;


    const prevHandler = () => {setToday(prev => prev.clone().subtract(1,displayMode))}
    const todayHandler = () =>{setToday(moment())}
    const nextHandler = () =>{setToday(prev => prev.clone().add(1,displayMode))}

    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [isShowForm, setShowForm] = useState(false)
    const [method, setMethod] = useState(null)

    const startDayQuery = startDay.clone().format('X');
    const endDayQuery = startDay.clone().add(totalDays, 'day').format('X')

 useEffect(()=>{
     fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
         .then(res => res.json())
         .then(res => setEvents(res));
 },[today]);

    const openFormHandler = (methodOpen, eventFormUpdate, dayItem) => {
        setEvent(eventFormUpdate || {...defaultEvent, date:dayItem.format('X ')})
        setMethod(methodOpen);
    }
    const openModalFormHandler = (methodOpen, eventFormUpdate, dayItem) => {
        setShowForm(true)
        openFormHandler(methodOpen, eventFormUpdate, dayItem)
    }

    const cancelButtonHandler= ()=>{
        setShowForm(false);
        setEvent(null);
    }

    const changeEventHandler =(text, field) =>{
        setEvent(prevState =>({
            ...prevState,
            [field]:text,
        }) )
    }
    const fetchHandler =(fetchUrl,eventForUpdate,httpMethod) =>{
        fetch(fetchUrl, {
            method : httpMethod,
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventForUpdate)
        })
            .then(res => res.json())
            .then(res => {
                if (method === 'Изменить'){
                    setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
                } else {
                    setEvents(prevState => [...prevState, res]);
                }
                cancelButtonHandler()
            })
    }
    const eventFetchHandler = () =>{
        const fetchUrl = method === 'Изменить' ? `${url}/events/${event.id}` : `${url}/events`;
        const httpMethod = method === 'Изменить' ? 'PATCH' : 'POST';
        fetchHandler(fetchUrl, event, httpMethod)
    }
    const updateEventByDragAndDrop = (droppedEvent) =>{
        const fetchUrl = `${url}/events/${droppedEvent.id}`;
        fetchHandler(fetchUrl,droppedEvent, 'PATCH');
    }

    const removeEventHandler = () => {
        const fetchUrl = `${url}/events/${event.id}`;
        const httpMethod = 'DELETE';
        fetch(fetchUrl, {
            method : httpMethod,
            headers:{
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(res => {
                setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
                cancelButtonHandler()
            })
    }
    // const day = startDay.clone().subtract(1, 'day')
    // const daysMap = [...Array(totalDays)].map(()=> day.add(1, 'day').clone());

    return(
       <>
           {
               isShowForm ? (<>

                                <FormPositionWrapper onClick={cancelButtonHandler}>
                                    <FormWrapper onClick={e => e.stopPropagation()}>
                                        <div>
                                            <EventTitle
                                            onChange={e => changeEventHandler(e.target.value, 'title')}
                                            value={event.title}
                                            placeholder="Введите название..."
                                            maxLength={30}
                                            />
                                            <EventBody
                                                onChange={e => changeEventHandler(e.target.value, 'description')}
                                                value={event.description}
                                                placeholder="Введите описание..."
                                                maxLength={250}/>
                                        </div>
                                        <ButtonsWrapper >
                                            <ButtonWrapper onClick={cancelButtonHandler}>Отмена</ButtonWrapper>
                                            <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                                            { method === 'Изменить' ? (<ButtonWrapper isSDelete onClick={removeEventHandler}>Удалить </ButtonWrapper>) : null }

                                        </ButtonsWrapper>
                                    </FormWrapper>
                                </FormPositionWrapper>
                   </>
               ) : null
           }
           <ShadowWrapper>
               <Header/>
               <Monitor
                   prevHandler={prevHandler}
                   todayHandler={todayHandler}
                   nextHandler={nextHandler}
                   today={today}
                   openModalFormHandler={openModalFormHandler}
                   setDisplayMode={setDisplayMode}
                   displayMode={displayMode }
               />
               {
                   displayMode === DISPLAY_MODE_MONTH ? (
                       <CalendarGrid  startDay={startDay}
                                      today={today}
                                      totalDays={totalDays}
                                      events={events}
                                      openModalFormHandler={openModalFormHandler}
                                      setDisplayMode={setDisplayMode}/>
                   ) :null
               }
               {
                   displayMode === DISPLAY_MODE_WEEK ? (
                       <WeekShowComponent events={events}
                                          today={today}
                                          startDay={startDay}
                       />
                   ): null
               }
               {
                   displayMode === DISPLAY_MODE_DAY ? (
                       <DayShowComponent events={events}
                                         today={today}
                                         totalDays={totalDays }
                                         selectedEvent={event}
                                         setEvent={setEvent}
                                         changeEventHandler={changeEventHandler}
                                         cancelButtonHandler={cancelButtonHandler}
                                         eventFetchHandler={eventFetchHandler}
                                         removeEventHandler={removeEventHandler}
                                         method={method}
                                         openFormHandler={openFormHandler}
                                         updateEventByDragAndDrop={updateEventByDragAndDrop}
                       />
                   ): null

               }

           </ShadowWrapper>
       </>
    )
}


export default CalendarShow
