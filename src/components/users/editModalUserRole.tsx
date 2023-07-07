import {IUser} from "../../interfaces/IUser";
import React, {useEffect, useState} from "react";
import {HttpError, useApiUrl, useOne, useTranslate} from "@refinedev/core";
import {IRolePermissions} from "../../interfaces/IRole";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, Grid, Typography} from "@mui/material";

type UserProps = {
    record: IUser;
    close: () => void;
    visible: boolean;
};

export const EditModalUserRole: React.FC<UserProps> = ({
                                                         record,
                                                         close : modalClose,
                                                         visible: modalVisible
                                                     }) =>{
    const t =useTranslate();

    const apiUrl = useApiUrl();

    const { data } = useOne<IRolePermissions ,HttpError>({
        resource: 'users/get_user_role',
        id: record.id,
    })


    const [formData, setFormData] = useState<IRolePermissions | undefined>(data?.data);

    useEffect(() => {
        if (data !== undefined){
            setFormData(data?.data)
        };
    }, [data]);

    const handleSubmit = async () => {

    }

    return(
        <Dialog closeAfterTransition open={modalVisible} onClose={modalClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    <Typography sx={{fontSize: 16, fontWeight: "800"}}>{record.last_name} {record.first_name} {record.patronymic}</Typography>
                    <Typography sx={{fontSize: 14, fontWeight: "800", marginTop: 2, marginBottom: -1}}>{t("user.fields.checkedRole")}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Fade in={modalVisible}>
                        <Grid container>
                        </Grid>
                    </Fade>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={modalClose}>{t("buttons.cancel")}</Button> <Button type="submit">{t("buttons.save")}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}