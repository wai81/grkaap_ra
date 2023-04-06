import React from "react";
import {
    DISPLAY_MODE_DAY,
    DISPLAY_MODE_MONTH,
    //DISPLAY_MODE_WEEK
} from "../Helpers/Constants";
import { CreateButton } from "@refinedev/mui";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import {CreateBookingTransportDrawer} from "../../booking_transports";
import { useModalForm } from "@refinedev/react-hook-form";


const Monitor = ({
                     nextHandler,
                     todayHandler,
                     prevHandler,
                     today,
                     setDisplayMode,
                     displayMode
                 }) => {

    const createDrawerFormProps = useModalForm({
        refineCoreProps: {
            resource: "booking_transport",
            action: "create",
            redirect: false,
        },
    });
    const {
        modal: { show: showCreateDrawer },
    } = createDrawerFormProps;

    return (

        <Stack
            direction={{xs: 'column', sm: 'row'}}
            justifyContent="space-evenly"
            alignItems="center"
            spacing={0.5}
            marginBottom={1}
        >
            <Typography alignItems={'center'} marginY={"auto"}>
                {/*<TitleWrapper>*/}
                {today.format('YYYY')}
                &nbsp;
                <b>{today.format('MMMM').toUpperCase()}</b>
                &nbsp;
                {displayMode === DISPLAY_MODE_DAY ? today.format('DD') : null}
            </Typography>
            <ButtonGroup>
                <Button variant={displayMode === DISPLAY_MODE_MONTH ? 'contained' : 'outlined'}
                        onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Месяц</Button>
                {/*<Button variant={displayMode === DISPLAY_MODE_WEEK ? 'contained' : 'outlined'}*/}
                {/*        unPressed={displayMode === DISPLAY_MODE_WEEK}*/}
                {/*        onClick={() => setDisplayMode(DISPLAY_MODE_WEEK)}>Неделя</Button>*/}
                <Button variant={displayMode === DISPLAY_MODE_DAY ? 'contained' : 'outlined'}
                        onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>День</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outlined" onClick={prevHandler}> &lt; </Button>
                <Button variant="outlined" onClick={todayHandler}>Сегодня</Button>
                <Button variant="outlined" onClick={nextHandler}> &gt; </Button>
            </ButtonGroup>
            <CreateButton
                //resourceNameOrRouteName='booking_transport'
                onClick={() => showCreateDrawer()}
            />

            <CreateBookingTransportDrawer {...createDrawerFormProps} />
        </Stack>
    )
}
export default Monitor