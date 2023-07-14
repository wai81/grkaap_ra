import {IRole, IRolePermissions, IRolePermissionsUpdate} from "../../interfaces/IRole";
import {HttpError, useApiUrl, useOne, useTranslate} from "@refinedev/core";
import {
    Button,
    Checkbox,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    Fade,
    FormControlLabel,
    Grid,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TOKEN_KEY} from "../../constants";
import axios from "axios";


interface FormData {
    options: Array<Array<string>>;
    checkeds: Array<Array<string>>;
}

type RoleProps = {
    record: IRole;
    close: () => void;
    visible: boolean;
};

export const EditModalPermissions: React.FC<RoleProps> = ({
    record,
    close : modalClose,
    visible: modalVisible
                                                     }) =>{
    const t =useTranslate();

    const apiUrl = useApiUrl();

    const { data } = useOne<IRolePermissions ,HttpError>({
        resource: 'admin/roles/get_permissions',
        id: record.id,
    })


    const [formData, setFormData] = useState<IRolePermissions | undefined>(data?.data);

    useEffect(() => {
        if (data !== undefined){
        setFormData(data?.data)
        };
    }, [data]);

    const handleCheckboxChange = (rowIndex: number, permissionIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formData !== undefined){
            const newCheckeds = [...formData.checkeds];
            if (event.target.checked) {
                if (!newCheckeds[rowIndex].includes(formData.options[rowIndex][permissionIndex])) {
                    newCheckeds[rowIndex].push(formData.options[rowIndex][permissionIndex]);
                }
            } else {
                const permission = formData.options[rowIndex][permissionIndex];
                const permissionInd = newCheckeds[rowIndex].indexOf(permission);
                if (permissionInd !== -1) {
                    newCheckeds[rowIndex].splice(permissionInd, 1);
                }
            }
            const newFormData: FormData = {
                ...formData,
                checkeds: newCheckeds
            };

            setFormData(newFormData);
            //console.log(formData?.checkeds)
        } else {
            console.log("'formData' is undefined");
        }
    };

    const handleSubmit = async () => {
        // отправляем данные на сервер
        //console.log(formData?.checkeds)
        const request: IRolePermissionsUpdate = {
            checkeds:formData?.checkeds
        }
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await axios.post<{ url: string }>(
            `${apiUrl}/admin/roles/update_permissions/${record.id}`,
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
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Dialog closeAfterTransition open={modalVisible} onClose={modalClose}>
            <form onSubmit={handleSubmit}>
            <DialogTitle>
                <Typography sx={{fontSize: 16, fontWeight: "800"}}>{record.name} ({record.role_key})</Typography>
            </DialogTitle>
            <DialogContent>
            <Fade in={modalVisible}>
                        <Grid container>
                            <Grid item xs={16} sm={12}>
                                <Typography sx={{fontSize: 13}}>{record.description}</Typography>
                                <Typography sx={{fontWeight: "800", marginTop: 1, marginBottom: -1}}>{t("admin/roles.fields.checkedPermissions")}</Typography>
                            {formData && formData.options.length > 0 ? (
                                formData?.options?.map((row, rowIndex)=>
                                    (row.map((permission,permissionIndex)=>{

                                            if (permissionIndex === 0) {
                                                return(
                                                    <Grid key={permissionIndex} item xs={12}>
                                                        <FormControlLabel
                                                        key={permissionIndex}
                                                        control={
                                                            <Checkbox
                                                                //size="small"
                                                                checked={formData && formData.checkeds
                                                                    ? formData.checkeds[rowIndex].includes(permission):
                                                                    false}
                                                                sx={{marginLeft:0}}
                                                                onChange={handleCheckboxChange(rowIndex,permissionIndex)}
                                                            />
                                                        }
                                                        //label={permission}
                                                         label={<Typography
                                                             sx={{fontWeight: "700"}}
                                                         >{permission}</Typography>}
                                                             sx={{marginTop: 1, marginBottom: -1}}
                                                        />
                                                    </Grid>
                                            )} else {
                                               return (
                                                   <Grid key={permissionIndex} item xs={12}>
                                                       <FormControlLabel
                                                           key={permissionIndex}
                                                           control={
                                                               <Checkbox
                                                                   // size="small"
                                                                   checked={formData && formData.checkeds
                                                                       ? formData.checkeds[rowIndex].includes(permission):
                                                                       false}
                                                                   sx={{marginLeft:3, marginTop: -1, marginBottom:-1}}
                                                                       // sx={ permissionIndex === 1 ?
                                                                   //     {marginLeft: 2}: {marginLeft: -1}}
                                                                   onChange={handleCheckboxChange(rowIndex,permissionIndex)}
                                                               />
                                                           }
                                                           label={permission}
                                                           //sx={{marginTop: 0, marginBottom: 0,}}
                                                       />
                                                   </Grid>
                                               )
                                            }
                                        })
                                    ))
                            ): (
                                <Grid
                                container
                                justifyContent="center"
                                padding={3}
                                >
                                <Typography variant="body2">
                                    {t("products.noProducts")}
                                </Typography>
                            </Grid>
                            )}
                            </Grid>
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