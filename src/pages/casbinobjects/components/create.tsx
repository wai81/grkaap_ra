import React from "react";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import {CrudFilters, useGetIdentity, useTranslate} from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, Drawer, IconButton, InputAdornment, TextField } from "@mui/material";
import moment from "moment/moment";
import {CloseOutlined} from "@mui/icons-material";
import {DateTimePicker} from "@mui/x-date-pickers";
import AvTimerTwoToneIcon from "@mui/icons-material/AvTimerTwoTone";
import GroupsIcon from "@mui/icons-material/Groups";
import {ICasbinObjectCreate} from "../../../interfaces/ICasbinObjects";
import {IUser} from "../../../interfaces/IUser";


export const CreateResourcesAppDrawer: React.FC<
    UseModalFormReturnType<ICasbinObjectCreate>
    > = ({
         modal: {
              visible,
              close,
          },
          handleSubmit,
          register,
          control,
          formState: {errors},
          refineCore:{onFinish, formLoading},
          reset,
      }) => {
    const t = useTranslate();


   const { data: user } = useGetIdentity<IUser>();


    return (

        <Drawer
            open={visible}
            onClose={() => close()}
            anchor="right"
            PaperProps={{sx: {width: {sm: "100%", md: 500}}}}

        >
            {/*<form  onSubmit={handleSubmit(handleOnSubmit)}>*/}
                <Create
                    saveButtonProps={{
                        //saveButtonProps
                        type: 'submit',
                    }}
                    headerProps={{
                        action: (
                            <IconButton
                                onClick={() => close()}
                                sx={{ width: "30px", height: "30px" }}
                            >
                                <CloseOutlined />
                            </IconButton>
                        ),
                        avatar: null,
                    }}
                    wrapperProps={{ sx: { overflowY: "scroll", height: "100vh" } }}
                    breadcrumb={''}
                >
                    <Box
                        component="form"
                        autoComplete="off"
                        sx={{ display: "flex", flexDirection: "column" }}
                    >
                        <TextField
                            {...register("number_order", {
                                required: t('required.field')
                            })}
                            error={!!(errors as any)?.number_order}
                            helperText={(errors as any)?.number_order?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('booking_transport.fields.number_order')}
                            name="number_order"
                            variant="outlined"
                            size={'small'}
                        />
                        <TextField
                            {...register("address_object", {
                                required: t('required.field')
                            })}
                            error={!!(errors as any)?.address_object}
                            helperText={(errors as any)?.address_object?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={t('booking_transport.fields.address_object')}
                            name="address_object"
                            variant="outlined"
                            size={'small'}
                        />
                        <Controller
                            control={control}
                            name="startDate"
                            // eslint-disable-next-line
                            defaultValue={moment()}
                            render={({field}) => (
                                <DateTimePicker
                                    {...field}
                                    //inputFormat="DD.MM.YYYY hh:mm"
                                    //ampm={false}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                                   label={t('booking_transport.fields.startDate')}
                                                   margin="normal"
                                                   variant="outlined"
                                                   required
                                                   size={'small'}

                                        />}
                                />
                            )}
                        />
                        <TextField
                            {...register("duration", {
                                required: t('required.field')
                            })}
                            error={!!(errors as any)?.duration}
                            helperText={(errors as any)?.duration?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            InputProps={{startAdornment:(
                                    <InputAdornment position="start">
                                        <AvTimerTwoToneIcon />
                                    </InputAdornment>
                                ),}}
                            type="number"
                            label={t('booking_transport.fields.duration')}
                            defaultValue={1}
                            name="duration"
                            size={'small'}
                        />
                        <TextField
                            {...register("count_man", {
                                required: t('required.field'),
                            })}
                            error={!!(errors as any)?.count_man}
                            helperText={(errors as any)?.count_man?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            InputProps={{startAdornment:(
                                    <InputAdornment position="start">
                                        <GroupsIcon />
                                    </InputAdornment>
                                ),}}
                            type="number"
                            label={t('booking_transport.fields.count_man')}
                            defaultValue={1}
                            name="count_man"
                            size={'small'}
                        />
                        <TextField
                            {...register("description")}
                            error={!!(errors as any)?.description}
                            helperText={(errors as any)?.description?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}

                            type="text"
                            label={t('booking_transport.fields.description')}
                            name="description"
                            multiline
                            minRows={2}
                            maxRows={2}
                            size={'small'}
                        />
                    </Box>
                </Create>
            {/*</form>*/}
        </Drawer>

    );
};