import React from "react";
import ReactTooltip from "react-tooltip";
import classes from "./Tooltip.module.scss";

const Tooltip = (props) => {
  return <ReactTooltip className={classes.tooltip} {...props} />;
};

export default Tooltip;
