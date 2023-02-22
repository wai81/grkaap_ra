import React from "react";
import styled from "styled-components";
import {
    DISPLAY_MODE_DAY,
    DISPLAY_MODE_MONTH,
    DISPLAY_MODE_TRANSPORT, DISPLAY_MODE_WEEK, DISPLAY_TRANSPORT_MODE_EVENT, DISPLAY_TRANSPORT_MODE_LIST
} from "../../Helpers/Constants";
import {TextWrapper, TitleWrapper} from "../../StyledList";


const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
  color: #DCDDDD;
padding: 0px 15px;
  height: 70px;
`;



const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonWrapper= styled('button')`
  border: ${props => props.unPressed ? '1px solid white' : 'unset'};
  background-color: ${props => props.unPressed ? '#27282a' : '#565759'};
  height: 31px;
  margin-right: 2px;
  border-radius: 4px;
  color: #E6E6E6;
  padding: 0px 10px;
  outline: unset;
  cursor: pointer;
`;

const TodayButton = styled(ButtonWrapper)`
padding-right: 16px;
  padding-left: 16px;
  font-weight: 600;
`;
const DateWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Monitor = ({nextHandler,todayHandler,prevHandler,today,openModalFormHandler, setDisplayMode, displayMode }) => {

    return(
        <DivWrapper>
            <DateWrapper>
                <TitleWrapper>
                    {today.format('MMMM').toUpperCase()}
                </TitleWrapper>
                {displayMode === DISPLAY_MODE_DAY ? (
                    <TextWrapper>
                        {today.format('DD')},
                    </TextWrapper>
                ):null }
               <TextWrapper>
                       {today.format('YYYY')}
               </TextWrapper>
            </DateWrapper>
            <ButtonsWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH} onClick={()=> setDisplayMode(DISPLAY_MODE_MONTH)}>Месяц</ButtonWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_WEEK} onClick={()=> setDisplayMode(DISPLAY_MODE_WEEK)}>Неделя</ButtonWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY} onClick={()=> setDisplayMode(DISPLAY_MODE_DAY)}>День</ButtonWrapper>
            </ButtonsWrapper>
            <ButtonsWrapper>
                <ButtonWrapper onClick={(e) => openModalFormHandler('Создать', null, today)}

                > Добавить запись </ButtonWrapper>
                <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
                <TodayButton onClick={todayHandler}>Сегодня</TodayButton>
                <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
            </ButtonsWrapper>
        </DivWrapper>
    )
}
export default Monitor