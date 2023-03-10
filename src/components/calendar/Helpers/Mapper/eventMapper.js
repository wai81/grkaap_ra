import moment from "moment";

export const eventMapper = (eventsBunch) => {
    const HOURS = 24;
    const rowHours = new Map([...Array(HOURS)].map((_,i) => ([i,new Map()])));
    eventsBunch
        .sort((a,b) => {
            return b.duration - a.duration})
        .forEach(e => {
            //const date = +moment.unix(+e.startDate).format('H')
            const date = +moment(e.startDate).format('h');
            const rowHourItem = rowHours.get(date);
            // console.log('e',e)
            rowHourItem.set(e.id,e);
            // console.log('rowHours',rowHourItem)
        });

    // console.log("rowHours",Object.fromEntries(rowHours));

    let i = 0;
    let rowNumber = 0;
    let columnNumber = 0;
    const columnsEventsGroups = new Map();
    columnsEventsGroups.set(columnNumber, new Map());

    let emptyRowsCount = 0;
    while (true) {

        if (rowHours.size === emptyRowsCount) {
            columnsEventsGroups.delete(columnNumber);
            break;
        }

        if(rowNumber > rowHours.size - 1) {
            rowNumber = 0;
            columnNumber++;
            columnsEventsGroups.set(columnNumber, new Map());
            emptyRowsCount = 0;
        }

        const rowAsHourData = rowHours.get(rowNumber);

        if(rowAsHourData.size === 0) {
            rowNumber++;
            emptyRowsCount++;
            continue;
        }
        // console.log('rowNumber',rowNumber);
        // console.log('rowAsHourData',rowAsHourData);
        const iterator = rowAsHourData.keys();
        // console.log('iterator ',iterator)
        const key = iterator.next().value;
        //console.log('key ',key)
        const firstEventInRowAsHourData = rowAsHourData.get(key);
        // console.log('firstEventInRowAsHourData ',firstEventInRowAsHourData)
        rowAsHourData.delete(key);
        (columnsEventsGroups.get(columnNumber)).set(key, firstEventInRowAsHourData);
        rowNumber = rowNumber + firstEventInRowAsHourData.duration;
        // console.log('rowNumber',rowNumber);
    }


    // console.log(columnsEventsGroups)

    return columnsEventsGroups;
}
