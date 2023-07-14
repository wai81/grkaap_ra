import {IUser, IUserRole, IUserRoleUpdate} from "../../interfaces/IUser";
import React, {useEffect, useState} from "react";
import {HttpError, useApiUrl, useOne, useTranslate} from "@refinedev/core";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    FormControlLabel,
    Grid,
    Typography
} from "@mui/material";
import {TOKEN_KEY} from "../../constants";
import axios from "axios";

interface FormData {
    options: Array<string>;
    checkeds: Array<string>;
}

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

    const { data } = useOne<IUserRole ,HttpError>({
        resource: 'users/get_user_role',
        id: record.id,
    })


    const [formData, setFormData] = useState<IUserRole | undefined>(data?.data);

    useEffect(() => {
        if (data !== undefined){
            setFormData(data?.data)
        };
    }, [data]);

    const handleCheckboxChange = (rowIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formData !== undefined){
            const newCheckeds = [...formData.checkeds];
            if (event.target.checked) {
                if (!newCheckeds.includes(formData.options[rowIndex])) {
                    newCheckeds.push(formData.options[rowIndex]);
                }
            } else {
                const permission = formData.options[rowIndex];
                const permissionInd = newCheckeds.indexOf(permission);
                if (permissionInd !== -1) {
                    newCheckeds.splice(permissionInd, 1);
                }
            }
            const newFormData: FormData = {
                ...formData,
                checkeds: newCheckeds
            };
            setFormData(newFormData);
        } else {
            console.log("'formData' is undefined");
        }
    };

    const handleSubmit = async () => {
        const request: IUserRoleUpdate ={
            checkeds:formData?.checkeds
        }
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await axios.put<{ url: string }>(
                `${apiUrl}/users/change_user_role/${record.id}`,
                request,
                {
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            console.log(res)
        } catch (error){
            console.error(error)
        }

    }

    return(
        <Dialog closeAfterTransition open={modalVisible} onClose={modalClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    <Typography sx={{fontSize: 16, fontWeight: "800"}}>{record.last_name} {record.first_name} {record.patronymic}</Typography>
                    <Typography sx={{fontSize: 14, fontWeight: "800", marginTop: 2, marginBottom: -1}}>{t("users.fields.checkedRole")}</Typography>
                </DialogTitle>
                <DialogContent>
                    <Fade in={modalVisible}>
                        <Grid container>
                            {formData && formData.options.length > 0 ? (
                                <Grid item xs={16} sm={12}>{
                                formData?.options?.map((role, roleIndex)=>{
                                            return(
                                                <Grid key={roleIndex} item xs={12}>
                                                    <FormControlLabel
                                                        key={roleIndex}
                                                        control={
                                                        <Checkbox
                                                        checked={
                                                            formData && formData.checkeds
                                                                ? formData.checkeds.includes((role))  :
                                                                false
                                                        }
                                                        onChange={handleCheckboxChange(roleIndex)}
                                                        />
                                                        }
                                                        label={role}
                                                    />
                                                </Grid>
                                            )
                                    })}
                                </Grid>):(
                                <Grid
                                    container
                                    justifyContent="center"
                                    padding={3}
                                >
                                    <Typography variant="body2">
                                        {t("users.fields.noRules")}
                                    </Typography>
                                </Grid>
                            )}

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