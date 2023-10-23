import {
    BaseRecord,
    CrudFilters,
    getDefaultFilter,
    HttpError,
    useGetIdentity,
    useList, useTable,
    useTranslate
} from "@refinedev/core";
import {Calendar, momentLocalizer, Event  } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, CircularProgress,
    Grid, IconButton, InputBase, Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useCallback, useMemo, useState} from "react";
import {
    ICreateRegistrationAppointment,
    IRegistrationAppointment, IRegistrationAppointmentFilterVariables,
    IUpdateRegistrationAppointment
} from "../../interfaces/IRegistrationAppointment";
import {useForm, useModalForm} from "@refinedev/react-hook-form";

import {CreateRegistrationAppointmentsDrawer} from "../../components/registration_appointments";
import {EditRegistrationAppointmentsDrawer} from "../../components/registration_appointments/edit";
import {CreateButton, List, useAutocomplete, useDataGrid} from "@refinedev/mui";
import './calendar.css'
import {CustomTooltip} from "../../components/customTooltip";
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from "@mui/icons-material/Search";
import {IUser, IUserFilterVariables} from "../../interfaces/IUser";
import {IBookingTransport, IBookingTransportFilterVariables} from "../../interfaces/IBookingTransport";
import {Controller} from "react-hook-form";

const localizer = momentLocalizer(moment)



export const RegistrationAppointmentList: React.FC = () => {
    const t = useTranslate();

    const { data: user } = useGetIdentity<IUser>();

    const [today, setToday] = useState(moment())


    const startDayQuery = today.clone().startOf('month').startOf('isoWeek').format('YYYY-MM-DD hh:mm:ss');
    const endDayQuery = today.clone().endOf('month').endOf('isoWeek').format('YYYY-MM-DD hh:mm:ss')
    //const [current, setCurrent] = useState(1);
    //const [pageSize, setPageSize] = useState(100);

    // const { data, isLoading, isError} = useList<
    //     IRegistrationAppointmentFilterVariables,
    //     HttpError,
    //     IRegistrationAppointment
    //     >({
    //     resource: "registration_appointment",
    //     pagination: {
    //         pageSize: 200,
    //     },
    //
    //     filters:
    //         [
    //             {
    //                 field: 'startDate',
    //                 operator: 'gte',
    //                 value: startDayQuery
    //             },
    //             {
    //                 field: 'startDate',
    //                 operator: 'lte',
    //                 value: endDayQuery
    //             },
    //             {
    //                 field: 'organization__id__in',
    //                 operator: 'eq',
    //                 value: user?.organization.id//organization,
    //             },
    //         ]
    // });
    //const eventBooking = data?.data? ?? [];

    const { tableQueryResult: data, setFilters, filters } = useTable<IRegistrationAppointment,HttpError>({
        resource: "registration_appointment",
        pagination: {
            pageSize: 200,
        },
        filters:{
            initial:[
                        {
                            field: 'startDate',
                            operator: 'gte',
                            value: startDayQuery
                         },
                        {
                            field: 'startDate',
                            operator: 'lte',
                            value: endDayQuery
                        },
                ]
        }
    })

    const eventBooking = data?.data?.data ?? [];

    const messages = {
        allDay: "Весь день",
        previous: "Назад",
        next: "Вперед",
        today: "Сегодня",
        month: "Месяц",
        week: "Неделя",
        work_week: 'Рабочая неделя',
        day: "День",
        agenda: "Список событий",
        date: "Дата",
        time: "Время",
        event: "Событие",
        showMore: (total: number) => `+ ${total} подробнее`,
        noEventsInRange:"В этом диапазоне нет событий."
    };

    const myEvents = eventBooking.map((event:IRegistrationAppointment)=>({
        id: event.id,
        start: moment(event.startDate).toDate(),
        end: moment(event.endDate).toDate(),
        data: { event },
    }));


    const onCreateNewEvent = useCallback((slot:any) => {
        showCreateDrawer()
    }, [])

    const createDrawerFormProps = useModalForm<ICreateRegistrationAppointment, HttpError>({

        refineCoreProps: {action: "create"},
        syncWithLocation: true,
        modalProps: {
            autoResetForm: true,
        },
        //  defaultValues:{
        //      startDate: startDayQuery,
        // }
    });
    const {
        modal: {show: showCreateDrawer},
    } = createDrawerFormProps;

    const editDrawerFormProps = useModalForm<IUpdateRegistrationAppointment, HttpError>({
        refineCoreProps: {action: "edit"},
        syncWithLocation: true,
    });
    const {
        modal: {show: showEditDrawer},
    } = editDrawerFormProps;


    const onNavigate = useCallback((newDate:any) => {
        //console.log(newDate)
        setToday(moment(newDate));
        const startDateNavigate = moment(newDate).clone().startOf('month').startOf('isoWeek').format('YYYY-MM-DD hh:mm:ss')
        const endDateNavigate = moment(newDate).endOf('month').endOf('isoWeek').format('YYYY-MM-DD hh:mm:ss')
        setFilters([
                {
                    field: 'startDate',
                    operator: 'gte',
                    value: startDateNavigate
                },
                {
                    field: 'startDate',
                    operator: 'lte',
                    value: endDateNavigate
                },
            ]);

    } , [setToday,setFilters]);


    // if (isLoading) {
    //     return <div><CircularProgress sx={{align: 'center'
    //     }}
    //                                   size={100}
    //     />{t('loading')}</div>;
    // }
    //
    // if (isError) {
    //     return <div>{t('error')}</div>;
    // }

    const CustomEvent = (data:any)=>{
        const event = data.event?.data.event;
        const statusAppointment = event?.statusAppointment;
        const created_at = new Date(event.created_at);
        const cratedAt = moment(created_at,'DD-MM-YYYY HH:mm:ss').format('DD.MM.YYYY HH:mm');
        const startDate = new Date(event.startDate);
        const startEvent = moment(startDate, 'DD-MM-YYYY HH:mm:ss').format('HH:mm');
        return (
            <div
                style={{ background:
                statusAppointment==='NEW'?'':
                statusAppointment==='APPOINTED'?'#9cefa1'
                :'#f3b0b0',
                borderRadius:'5px', color:'black'
            }}
            >
                <CustomTooltip arrow //placement="bottom-start"
                               title={<Stack sx={{padding: "2px"}}>
                                   <table width={"100%"}>
                                       <thead>
                                       <tr>
                                           <th style={{alignContent:"center", width:"20%"}}>Время</th>
                                           <th style={{alignContent:"center", width:"40%"}}>Регистратор</th>
                                           <th style={{alignContent:"center", width:"40%"}}>Заказчик</th>
                                       </tr>
                                       </thead>
                                       <tbody>
                                       <tr key={event.id}>
                                           <td style={{alignContent:"flex-start", width:"20%"}}>
                                               <AccessTimeIcon sx={{ fontSize: 12 }} /> {startEvent}
                                           </td>
                                           <td style={{alignContent:"flex-start", width:"40%"}}>
                                               <p style={{marginBottom:0}}>
                                                   <PersonIcon sx={{ fontSize: 12 }} /> {event.executor}
                                               </p>
                                               {event.subunit.title}
                                           </td>
                                           <td style={{alignContent:"flex-start", width:"40%"}}>
                                               <p style={{marginBottom:0}}>
                                                   <FaceIcon sx={{ fontSize:12 }}/> {event.costumerName}
                                               </p>
                                               <p style={{marginBottom:0}}>
                                                   <PhoneAndroidIcon sx={{ fontSize:12 }}/> {event.costumerContactPhone}
                                               </p>
                                               <LocationOnIcon sx={{ fontSize:12 }}/>{event.addressObject}
                                           </td>
                                       </tr>
                                       </tbody>
                                   </table>
                                   <Typography variant={"caption"} color="disabled" >
                                       <CalendarTodayIcon sx={{ fontSize: 12 }} color={"disabled"}/> {cratedAt} <PersonIcon sx={{ fontSize: 12 }} color={"disabled"} /> {event.creator.username}
                                   </Typography>
                               </Stack>}
                >
                    <Typography variant="body2" display="block" gutterBottom>
                        <PersonIcon sx={{ fontSize: 18 }} color={"disabled"}/> <b>{event.executor}</b> {event.typeRegistration}
                    </Typography>
                </CustomTooltip>
            </div>
        )
    }

    const {autocompleteProps: organizationAutocompleteProps} = useAutocomplete({
        resource: "organizations",
        defaultValue: getDefaultFilter("organization.id", filters, "eq"),

        onSearch: (value) => {
            const filters: CrudFilters = [];
            filters.push({
                field: "q",
                operator: "eq",
                value: value.length > 0 ? value : undefined,
            });
            return filters;
        },

        sorters: [{field: "id", order: "asc"}]
    });

    return(
            <List
                headerButtons={() =>(
                    <>
                        <CreateButton onClick={()=>onCreateNewEvent}/>
                    </>
                )}
            >
                <Stack
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                padding={1}
                direction="row"
                gap={2}
                >
                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                            marginBottom: 1
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={t("registration_appointment.filter.q.label")}
                            inputProps={{
                                "aria-label": t("registration_appointment.filter.q.label"),
                            }}
                            value={getDefaultFilter(
                                "q",
                                filters,
                                "eq",
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setFilters([
                                    {
                                        field: "q",
                                        operator: "eq",
                                        value:
                                            e.target.value !== ""
                                                ? e.target.value
                                                : undefined,
                                    },
                                ]);
                            }}
                        />
                        <IconButton
                            type="submit"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: 300,
                            marginBottom: 1
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={t("registration_appointment.filter.executor.label")}
                            inputProps={{
                                "aria-label": t("registration_appointment.filter.executor.label"),
                            }}
                            value={getDefaultFilter(
                                "executor_like",
                                filters,
                                "eq",
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setFilters([
                                    {
                                        field: "executor_like",
                                        operator: "eq",
                                        value:
                                            e.target.value !== ""
                                                ? e.target.value
                                                : undefined,
                                    },
                                ]);
                            }}
                        />
                        <IconButton
                            type="submit"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Stack>
                <CreateRegistrationAppointmentsDrawer {...createDrawerFormProps} />
                <EditRegistrationAppointmentsDrawer {...editDrawerFormProps} />
                <Calendar
                    messages={messages}
                    className="calendar"
                    localizer={localizer}
                    events={myEvents}
                    components={{
                        event: CustomEvent}}
                    onSelectEvent={(event)=>showEditDrawer(event.id)}
                    onSelectSlot={onCreateNewEvent}
                    onNavigate = {onNavigate}
                    startAccessor={(event: any) => {
                        return moment(event.start).toDate();
                    }}
                    endAccessor={(event: any) => {
                        return moment(event.end).toDate();
                    }}
                    titleAccessor={(event: any) => {
                        return event.title;
                    }}
                    allDayAccessor={(event: any) => {
                        return event.allDay === true;
                    }}
                    min={moment().startOf('day').subtract(16,'hour').toDate()}
                    max={moment().endOf('day').subtract(3,'hour').toDate()}
                    defaultDate={moment().toDate()}
                    //popup
                    selectable
                    style={{ height: "800px"}}
                />
            </List>
    )
};
