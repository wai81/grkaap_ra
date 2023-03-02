import { TextField } from "@pankod/refine-mui"
import {forwardRef} from "react";

// @ts-ignore
function  CustomRangeInput ({openCalendar, value,handleValueChange, label, margin },ref) {

    return (
        <TextField
            onFocus={openCalendar}
            value={value}
            onChange={handleValueChange}
            label={label}
            fullWidth
            margin={margin}
            variant="outlined"
            size="small"
            ref={ref}
            sx={{width: 230, paddingX: 0.5}}
        />
    )
}

export default forwardRef(CustomRangeInput)