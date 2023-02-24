import React from "react";
import styled from "styled-components";
import {
    DISPLAY_MODE_DAY,
    DISPLAY_MODE_MONTH,
    DISPLAY_MODE_TRANSPORT, DISPLAY_MODE_WEEK, DISPLAY_TRANSPORT_MODE_EVENT, DISPLAY_TRANSPORT_MODE_LIST
} from "../Helpers/Constants";
import {Button, ButtonGroup, Stack, Typography} from "@pankod/refine-mui";


const Monitor = ({
                     nextHandler,
                     todayHandler,
                     prevHandler,
                     today,
                     openModalFormHandler,
                     setDisplayMode,
                     displayMode
                 }) => {

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
                        unPressed={displayMode === DISPLAY_MODE_MONTH}
                        onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Месяц</Button>
                {/*<Button variant={displayMode === DISPLAY_MODE_WEEK ? 'contained' : 'outlined'}*/}
                {/*        unPressed={displayMode === DISPLAY_MODE_WEEK}*/}
                {/*        onClick={() => setDisplayMode(DISPLAY_MODE_WEEK)}>Неделя</Button>*/}
                <Button variant={displayMode === DISPLAY_MODE_DAY ? 'contained' : 'outlined'}
                        unPressed={displayMode === DISPLAY_MODE_DAY}
                        onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>День</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button variant="outlined" onClick={prevHandler}> &lt; </Button>
                <Button variant="outlined" onClick={todayHandler}>Сегодня</Button>
                <Button variant="outlined" onClick={nextHandler}> &gt; </Button>
            </ButtonGroup>
            <Button title={'Добавить запись'} variant="contained"
                    onClick={(e) => openModalFormHandler('Создать', null, today)}
            > Создать </Button>
        </Stack>
    )
}
export default Monitor