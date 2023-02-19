import { BooleanFieldProps, Tooltip, useTheme } from "@pankod/refine-mui";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import React from "react";

export const ItemStatus: React.FC<BooleanFieldProps> = (
  {
    value,
    valueLabelTrue = "true",
    valueLabelFalse = "false",
    trueIcon,
    falseIcon,
    svgIconProps,
    ...rest
  }) => {

  
  return (
      <Tooltip
       title={value ? valueLabelTrue : valueLabelFalse} {...rest}>
            {value ? (
                <span>{trueIcon ?? <CheckOutlined color={"success"} {...svgIconProps} />}</span>
            ) : (
                <span>{falseIcon ?? <CloseOutlined color={"error"} {...svgIconProps} />}</span>
            )}
      </Tooltip>
  );
};

