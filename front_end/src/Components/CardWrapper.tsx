import React from "react";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { IEvent } from "../../../shared/interfaces";

const CardWrapper = ({ event, hide }: { event: IEvent; hide: boolean }) => {
  if (hide) {
    return null;
  }

  return (
    <React.Fragment key={event.id}>
      <Hidden xsDown mdUp>
        <Grid xs={2} item />
      </Hidden>
      <Grid key={event.id} xs={12} sm={8} md={6} item>
        <EventCard event={event} />
      </Grid>
      <Hidden xsDown mdUp>
        <Grid xs={2} item />
      </Hidden>
    </React.Fragment>
  );
};

export default CardWrapper;
