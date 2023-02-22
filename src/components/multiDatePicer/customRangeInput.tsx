import { TextField } from "@pankod/refine-mui"
import {forwardRef} from "react";

// @ts-ignore
function  CustomRangeInput ({openCalendar, value,handleValueChange, label },ref) {

    return (
        <TextField
            onFocus={openCalendar}
            value={value}
            onChange={handleValueChange}
            label={label}
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            ref={ref}
        />
    )
}

export default forwardRef(CustomRangeInput)