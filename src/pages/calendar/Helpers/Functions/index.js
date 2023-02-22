import moment from "moment/moment";

export const isCurrentDay = (day) => moment().isSame(day, 'day');

export const isCurrentWeek =(week) => moment().isSame(week,'week');

export const isSelectedMonth = (day, today) => today.isSame(day, 'month');

export const isDayContainCurrentTimestamp = (a, b) => a >= b.startOf('day').format('X') && a <= b.clone().endOf('day').format('X');

export const isDayContainCurrentEvent =(event, dayItem) => isDayContainCurrentTimestamp( event.date, dayItem);

export const isEventWeekList = (a, b) => a >= b.startOf('week').format('X') && a <= b.clone().endOf('week').format('X');
export const isEventWeekListTime =(event, dayItem) => isEventWeekList( event.date, dayItem);