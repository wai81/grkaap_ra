import {IRole, IRolePermissions} from "../../interfaces/IRole";
import {HttpError, useOne, useTranslate, useUpdate} from "@refinedev/core";
import {
    Button,
    Checkbox,
    Dialog, DialogActions,
    DialogContent, DialogTitle,
    FormControlLabel,
    Grid,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";


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

    const {mutate: updatePermissions} = useUpdate();

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

    const handleSubmit = () => {
        // отправляем данные на сервер
        updatePermissions(
            {
                resource: 'admin/roles/update_permissions',
                id: record.id,
                values: {
                    checkeds: formData?.checkeds
                },
            },
        )
    // const request: IRolePermissionsUpdate = {
    //     checkeds:formData?.checkeds
    // }
    //     const token = localStorage.getItem(TOKEN_KEY);
    //     try {
    //         const res = await axios.post<{ url: string }>(
    //         `${apiUrl}/admin/roles/update_permissions/${record.id}`,
    //         request,
    //         {
    //             withCredentials: false,
    //             headers: {
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         }
    //     );
    // //        console.log(res)
    //     } catch (error) {
    //         console.error(error)
    //     }
    };

     return (
        <Dialog
            closeAfterTransition
            open={modalVisible}
            onClose={modalClose}
            maxWidth={"lg"}
        >
            <form onSubmit={handleSubmit}>
            <DialogTitle>
                <Typography sx={{fontSize: 16, fontWeight: "800"}}>{record.name} ({record.role_key})</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography sx={{fontSize: 13}}>{record.description}</Typography>
                <Typography sx={{fontWeight: "700", marginTop: 1, marginBottom: 2}}>{t("admin/roles.fields.checkedPermissions")}</Typography>
                    {formData && formData.options.length > 0 ? (
                        <Grid container
                              spacing={{ xs: 1, md: 0.5 }}
                              columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            {(formData?.options?.map((row, rowIndex) =>
                                (row.map((permission, permissionIndex) =>
                                    <Grid key={permissionIndex}
                                      // item
                                       //xs={6}
                                      xs={6} sm={6} md={2}
                                      sx={permissionIndex === 0 ?
                                          {
                                              border: '1px solid #ccc!important' ,
                                              backgroundColor: 'background.default' ,
                                              borderRadius:1,
                                              marginTop: 1,
                                          }
                                          :{marginTop: 1}}
                                    >
                                        <FormControlLabel
                                            key={permissionIndex}
                                            control={
                                                <Checkbox
                                                    //size="small"
                                                    checked={formData && formData.checkeds
                                                        ? formData.checkeds[rowIndex].includes(permission) :
                                                        false}
                                                    sx={{ marginLeft: 0.5 }}
                                                    onChange={handleCheckboxChange(rowIndex, permissionIndex)}
                                                    color={permissionIndex===0? 'primary':
                                                        permissionIndex===1 || permissionIndex===2?'info':
                                                            permissionIndex===3?'success':
                                                                permissionIndex===4?'warning':'error'}

                                                />
                                            }
                                            //label={permission}
                                            label={<Typography
                                                sx={permissionIndex === 0 ? {fontSize:13,
                                                        fontWeight: "700",
                                                        marginLeft: -1}
                                                    : {fontSize:14}}
                                            >{permission}</Typography>}

                                        />
                                    </Grid>
                                    )
                                ))
                            )}
                        </Grid>
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
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} autoFocus onClick={modalClose}>{t("buttons.cancel")}</Button> <Button type="submit">{t("buttons.save")}</Button>
            </DialogActions>
            </form>
        </Dialog>
    )

}