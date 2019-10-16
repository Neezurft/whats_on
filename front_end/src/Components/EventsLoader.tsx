import React from "react";
import EventOptionSelector from "./EventOptionSelector";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Hidden from "@material-ui/core/Hidden";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import { IEvent, IEventType } from "../../../shared/interfaces";
import { fetchEvents, fetchMoreEvents } from "../Utils/utils";
import moment from "moment";

interface State {
  loadedEvents: IEvent[];
  selectedEventTypes: IEventType[];
  loadingMore: boolean;
  nothingToLoad: boolean;
  error: boolean;
}

type Props = WithStyles<typeof styles>;

class EventsLoader extends React.Component<Props, State> {
  state: State = {
    loadedEvents: [],
    selectedEventTypes: [],
    loadingMore: false,
    nothingToLoad: false,
    error: false
  };

  pendingFetches: number = 0;
  fecthedInfo: Array<{ eventType: IEventType; nextPageQuery: string | null }> = [];

  componentDidMount() {
    window.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.selector}>
          <EventOptionSelector onChange={this.handleEventTypeChange} />
        </div>
        <Grid container={true}>
          <Grid xs={12}>
            <div style={{ height: 10 }}>{this.pendingFetches !== 0 && <LinearProgress />}</div>
          </Grid>
          {this.state.loadedEvents.map(event => {
            if (!this.state.selectedEventTypes.includes(event.type)) {
              return null;
            }
            return (
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
            );
          })}
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 40 }}
        >
          {this.state.loadingMore && <CircularProgress />}
          {this.state.nothingToLoad && <Typography>No more events to Load</Typography>}
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.error}
          autoHideDuration={1000}
          onClose={() => this.setState({ error: false })}
        >
          <SnackbarContent
            style={{ backgroundColor: "red" }}
            message="Something has gone wrong, please try again!"
          />
        </Snackbar>
      </div>
    );
  }

  handleEventTypeChange = (selectedEventTypes: IEventType[] | undefined | null) => {
    if (!selectedEventTypes) {
      this.setState({ selectedEventTypes: [], nothingToLoad: false });
      return;
    }

    for (const eventType of selectedEventTypes) {
      const hasntFetchedEventType = !this.fecthedInfo.find(info => info.eventType === eventType);

      if (hasntFetchedEventType) {
        this.setState({ nothingToLoad: false });
        this.pendingFetches = this.pendingFetches + 1;
        this.loadEvents(eventType);
      }
    }

    this.setState({ selectedEventTypes });
  };

  async loadEvents(eventType: IEventType) {
    try {
      const response = await fetchEvents(eventType);

      const allEvents = [...this.state.loadedEvents, ...response.events];

      allEvents.sort((a, b) => moment(a.start_datetime).diff(moment(b.start_datetime)));

      this.fecthedInfo.push({
        eventType,
        nextPageQuery: response.pagination.next_page
      });

      this.pendingFetches = this.pendingFetches - 1;
      this.setState({
        loadedEvents: allEvents
      });
    } catch {
      // todo: can be improved, showing more meaningful errors to user
      this.pendingFetches = this.pendingFetches - 1;
      this.setState({ error: true });
    }
  }

  async loadMoreEvents() {
    const nothingToLoad = !this.fecthedInfo.find(info => info.nextPageQuery !== null);

    if (nothingToLoad) {
      this.setState({ nothingToLoad });
      return;
    }

    this.setState({ loadingMore: true, nothingToLoad });

    let newLoadedEvents: IEvent[] = [];
    let error = false;

    for (const info of this.fecthedInfo) {
      if (info.nextPageQuery) {
        try {
          const response = await fetchMoreEvents(info.nextPageQuery);
          newLoadedEvents = newLoadedEvents.concat(response.events);
          info.nextPageQuery = response.pagination.next_page;
        } catch {
          // todo: can be improved, showing more meaningful errors to user
          error = true;
        }
      }
    }

    const allEvents = [...this.state.loadedEvents, ...newLoadedEvents];

    allEvents.sort((a, b) => moment(a.start_datetime).diff(moment(b.start_datetime)));

    this.setState({ loadedEvents: allEvents, loadingMore: false, error });
  }

  listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const remainsToBeScrolled = height - winScroll;

    if (remainsToBeScrolled === 0 && !this.state.loadingMore) {
      this.loadMoreEvents();
    }
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
