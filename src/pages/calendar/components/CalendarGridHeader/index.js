import React from 'react'
import moment from "moment/moment";
import {CellWrapper, RowInCell} from "../../StyledList";


const CalendarGridHeader = () => {
     return(
   <>
       {[...Array(7)].map((_, i )=>
           (<CellWrapper isHeader isSelectedMonth key={i}>
                   <RowInCell  isHeader justifyContent={'flex-end'} pr={1} >
                       {moment().day(i+1).format('dddd')}
                   </RowInCell>
               </CellWrapper>
           ))}
   </>
    )
}


export default CalendarGridHeader
