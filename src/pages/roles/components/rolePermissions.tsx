import {IRole, IRolePermissions} from "../../../interfaces/IRole";
import {HttpError, useOne, useTranslate} from "@refinedev/core";
import {Accordion, Box, Button, Checkbox, Fade, FormControlLabel, Grid, Modal, Typography} from "@mui/material";

import React, {useEffect, useState} from "react";
import {A} from "@fullcalendar/core/internal-common";


interface FormData {
    options: Array<Array<string>>;
    checkeds: Array<Array<string>>;
}

type RoleProps = {
    record: IRole;
    close: () => void;
    visible: boolean;
};

export const RolePermissions: React.FC<RoleProps> = ({
    record,
    close : modalClose,
    visible: modalVisible
                                                     }) =>{
    const t =useTranslate();


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
            console.log(formData?.checkeds)
        } else {
            console.log("'formData' is undefined");
        }
    };

    const handleSubmit = () => {
        // отправляем данные на сервер
        console.log(formData?.checkeds)
    };


    const style = {
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: { xs: 380, sm: 480, md: 680, lg: 780 },
        heigth: 650,
        bgcolor: "background.paper",
        p: 2,
        my: 2,
        borderRadius: "5px",
    };



    return (
        <Modal closeAfterTransition open={modalVisible} onClose={modalClose}>
            <Fade in={modalVisible}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={16} sm={12}>
                                <Typography sx={{fontSize: 25, fontWeight: "800"}}>{record.name} ({record.role_key})</Typography>
                                <Typography sx={{fontSize: 13}}>{record.description}</Typography>
                                <Typography sx={{fontSize: 18, fontWeight: "800", marginTop: 2, marginBottom: -1}}>{t("admin/roles.fields.checkedPermissions")}</Typography>
                            {formData && formData.options.length > 0 ? (
                                formData?.options?.map((row, rowIndex)=>
                                    (row.map((permission,permissionIndex)=>{

                                            if (permissionIndex === 0) {
                                                return(
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                        key={permissionIndex}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={formData && formData.checkeds
                                                                    ? formData.checkeds[rowIndex].includes(permission):
                                                                    false}
                                                                sx={{marginLeft:1}}
                                                                onChange={handleCheckboxChange(rowIndex,permissionIndex)}
                                                            />
                                                        }
                                                        label={<Typography
                                                            sx={{fontSize: 14, fontWeight: "700"}}>{permission}</Typography>}
                                                            sx={{marginTop: 1, marginBottom: -1}}
                                                        />
                                                    </Grid>
                                            )} else {
                                               return (
                                                       <FormControlLabel
                                                           key={permissionIndex}
                                                           control={
                                                               <Checkbox
                                                                   size="small"
                                                                   checked={formData && formData.checkeds
                                                                       ? formData.checkeds[rowIndex].includes(permission):
                                                                       false}
                                                                   sx={{marginLeft: 4}}
                                                                   onChange={handleCheckboxChange(rowIndex,permissionIndex)}
                                                               />
                                                           }
                                                           label={<Typography sx={{fontSize: 12,}}>{permission}</Typography>}
                                                           sx={{marginTop: 0, marginBottom: 0,}}
                                                       />

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
                        <Button type="submit">Submit</Button>
                    </form>
                </Box>

            </Fade>
        </Modal>
    )

}