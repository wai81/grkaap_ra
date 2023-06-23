import React, {useState} from "react";
import {Checkbox, FormControlLabel, Typography} from "@mui/material";


type ArrayType = Array<Array<string>>;

interface ICompareArrays {
    (options: ArrayType, checkeds: ArrayType): JSX.Element[][];
}

export const CheckedPermissions: ICompareArrays = (options, checkeds) => {


    return options?.map((subArr1, index1) =>
        subArr1.map((value, index) => {

            const subArr2 = checkeds?.find((subArr) => subArr[0] === subArr1[0]);
            const checkedValue = subArr2?.find((value1) => value1===value)
            const check = value === checkedValue;

            //console.log('checkedValue ' + checkedValue+ ' checked '+ checked)
            return (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            size="small"
                            checked={check}
                            value={value}
                            sx={index=== 0? {marginLeft:0}
                                :{marginLeft: 2}}
                        />
                    }
                    label={index1 === 0 ?
                        <Typography sx={{fontSize: 13, fontWeight: "600"}}>{value}</Typography> :
                        <Typography sx={{fontSize: 12,}}>{value}</Typography>
                    }
                    sx={index === 0 ? {marginTop: 0, marginBottom: -0.5}
                        : {marginTop: -1, marginBottom: -1,}}
                />
            );
        }));

};