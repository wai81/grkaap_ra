import styled from "styled-components";

export const CellWrapper = styled.div`
  width: 100px;
  height: ${props => props.isHeader ? 24 : 105}px;
  background-color: ${props => props.isWeekend ? '#f3f3f3' : '#ffffff' };
  color: ${props => props.isSelectedMonth ? `#626262` : '#b6b6b6'};
`;

export const RowInCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};  
    ${props => props.pr && `padding-right: ${props.pr * 10}px`};
    padding-left: ${props => props.isHeader ? 10 : 0}px;
`;

export const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

export const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #67be23;
  border-radius: 50%;
  color: #ffffff;
`;
export const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;   
`;

export const EventListWrapper= styled('ul')`
  margin: unset;
  list-style-position: inside;
  padding: 0;
`;
export const EventListItemWrapper = styled('li')`
    padding: 0px 3px;	
	display: flex;
`;

export const EventItemWrapper = styled('button')`
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  border: unset;
  background: ${props => props.isMore ? 'rgba(144,148,148,0.56)' : 'rgba(103,190,35,0.45)'};
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  padding-left: 5px;
  height: 17px;
  margin: 2px 2px 0px;
  text-align: left;
`;
export const EventItemButtonWrapper = styled(EventItemWrapper)`
  width: ${props => props.w}px;
  min-height: ${props => props.h}px;
  padding-right: 10px;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  margin-top: 0px;
  
`;

export const EventTitle = styled('input')`
   padding: 8px 14px;
   font-size: 0.85rem;
   width: 100%;
   border: unset;
   background-color: #DDDDDD;
   color: black;
   outline: unset;
   border: 1px solid #464648;
   margin-bottom: 10px;
    `;
export const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color:  #DDDDDD;
  color: black;
  outline: unset;
  border: 1px solid #464648;
  resize: none;
  min-height: 150px;
`;

export const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonWrapper =styled('button')`
  border: unset;
  background-color:${props => props.isSDelete ? `red` : '#565759'};
  height: 31px;
  margin-right: 6px;
  border-radius: 4px;
  color: #E6E6E6;
  padding: 0px 10px;
  outline: unset;
  cursor: pointer;   
`;
export const ButtonWrapperForms = styled(ButtonWrapper)`
  width: 150px;
  background-color: ${props => props.background};
`;
export const TextWrapper = styled('span')`
font-size: 25px;  margin-right: 5px;
`;

export const TitleWrapper = styled(TextWrapper)`
 font-weight: bold;
  margin-right: 8px;
`;