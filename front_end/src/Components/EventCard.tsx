import React from "react";
import { IEvent } from "../../../shared/interfaces";
import Grid from "@material-ui/core/Grid";

export default (props: { event: IEvent }) => {
  return <Grid xs={12}>{props.event.name}</Grid>;
};
