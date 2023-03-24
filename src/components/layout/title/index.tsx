import React from 'react';
import { useRouterContext, TitleProps } from "@refinedev/core";
import { Button } from "@mui/material";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img
            //src="/refine-collapsed.svg"
            src="/grcapp-collapsed_2.svg"
            alt="Refine"
            width="28px"
          />
        ) : (
          <img
            //src="/refine.svg"
            src="/grcapp_3.svg"
            alt="Refine"
            width="140px"
          />
        )}
      </Link>
    </Button>
  );
};
