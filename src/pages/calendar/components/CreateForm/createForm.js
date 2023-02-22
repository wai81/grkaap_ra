import React from 'react'
import {ButtonsWrapper, ButtonWrapper, EventBody, EventTitle} from "../../StyledList";
import styled from "styled-components";

const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #464648;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-width: 850px;
  min-height: 702px;
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
    min-width: 320px;
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


const FormCreate = (cancelButtonHandler,changeEventHandler,eventFetchHandler,removeEventHandler,event,method,openModalFormHandler) => {

    return(
        <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={e => e.stopPropagation()}>
                <div> <EventTitle
                    onChange={e => changeEventHandler(e.target.value, 'title')}
                    value={event.title}
                    placeholder="Введите название..."
                    maxLength={30}
                />
                    <EventBody
                        onChange={e => changeEventHandler(e.target.value, 'description')}
                        value={event.details}
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
    )
}
export default FormCreate