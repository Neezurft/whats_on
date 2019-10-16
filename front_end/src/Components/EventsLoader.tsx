import React from "react";
import EventOptionSelector from "./EventOptionSelector";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { IEvent, IEventType } from "../../../shared/interfaces";
import { fetchEvents } from "../Utils/utils";

interface State {
  loadedEvents: IEvent[];
  selectedEventTypes: IEventType[];
  fectchedEventTypes: IEventType[];
}

type Props = WithStyles<typeof styles>;

class EventsLoader extends React.Component<Props, State> {
  state: State = {
    loadedEvents: [],
    selectedEventTypes: [],
    fectchedEventTypes: []
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  render() {
    const { classes } = this.props;

    console.log(JSON.stringify(this.state.selectedEventTypes, null, 2));

    return (
      <div className={classes.container}>
        <div className={classes.selector}>
          <EventOptionSelector onChange={this.handleEventTypeChange} />
        </div>
        <Grid container={true}>
          {this.state.loadedEvents.map(event => (
            <React.Fragment key={event.id}>
              <Hidden xsDown mdUp>
                <Grid sm={2} />
              </Hidden>
              <Grid xs={12} sm={8} md={6}>
                <EventCard event={event} />
              </Grid>
              <Hidden xsDown mdUp>
                <Grid sm={2} />
              </Hidden>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    );
  }

  handleEventTypeChange = (selectedEventTypes: IEventType[] | undefined | null) => {
    if (!selectedEventTypes) {
      this.setState({ selectedEventTypes: [] });
      return;
    }

    for (const eventType of selectedEventTypes) {
      if (!this.state.fectchedEventTypes.includes(eventType)) {
        this.loadEvents(eventType);
      }
    }

    this.setState({ selectedEventTypes });
  };

  loadEvents(eventType: IEventType) {
    fetchEvents(eventType).then(loadedEvents =>
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...loadedEvents],
        fectchedEventTypes: [...this.state.fectchedEventTypes, eventType]
      })
    );
  }

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = winScroll / height;

    console.log(scrolled);
  };
}

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  selector: {
    width: "100%"
  }
});

export default withStyles(styles)(EventsLoader);
