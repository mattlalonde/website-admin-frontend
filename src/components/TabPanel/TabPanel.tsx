import React, { FunctionComponent } from "react";
import { Typography, Box } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id: string;
  }
  
  export const TabPanel: FunctionComponent<TabPanelProps> = (props: TabPanelProps) => {
    const { children, value, index, id, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={id}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }