import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IEvent } from "../../../shared/interfaces";
import Counter from "./Counter";
import { formUrl, getEventTypeLabel } from "../Utils/utils";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  },
  leftPanel: {
    width: "50%",
    textAlign: "left",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  rightPanel: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  counter: {
    display: "flex",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default (props: { event: IEvent }) => {
  const classes = useStyles();
  const { event } = props;

  return (
    <div className={classes.card}>
      <div className={classes.leftPanel}>
        <Typography variant="body2" color="primary" component="p">
          {getEventTypeLabel(event.type)}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {event.name}
        </Typography>
      </div>
      <div className={classes.rightPanel}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ExitToAppIcon />}
          href={formUrl(event.id, event.full_slug)}
          target="_blank"
          rel="noreferrer"
        >
          <Typography variant="subtitle2" component="p">
            see details
          </Typography>
        </Button>

        <div className={classes.counter}>
          <Typography variant="subtitle2" component="p">
            starts in:
          </Typography>
          <div style={{ width: 5 }} />
          <Counter startTime={event.start_datetime} onTimerStop={() => undefined} />
        </div>
      </div>
    </div>
  );
};
