import React, { useEffect, useState, useRef, Dispatch } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventOptionSelector from "./EventOptionSelector";
import CardWrapper from "./CardWrapper";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import { IEvent, IEventType } from "../../../shared/interfaces";
import { fetchEvents, fetchMoreEvents } from "../Utils/utils";
import { StoreState, Action } from "../State/index";
import { ThunkDispatch } from "redux-thunk";

export default () => {
  const dispatch = useDispatch<ThunkDispatch<StoreState, void, Action>>();
  const loadedEvents = useSelector<StoreState, IEvent[]>(state => state.events);

  const [selectedEventTypes, setSelectedEventTypes] = useState<IEventType[]>(
    []
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [nothingToLoad, setNothingToLoad] = useState(false);
  const [error, setError] = useState(false);
  const [pendingFetches, setPendingFetches] = useState(0);

  const fetchedInfo = useRef<
    Array<{ eventType: IEventType; nextPageQuery: string | null }>
  >([]);

  useEffect(() => {
    const loadMoreEvents = async () => {
      const nothingToLoad = !fetchedInfo.current.find(
        info => info.nextPageQuery !== null
      );

      if (nothingToLoad) {
        setNothingToLoad(true);
        return;
      }

      setNothingToLoad(false);
      setLoadingMore(true);

      let newLoadedEvents: IEvent[] = [];
      let error = false;

      for (const info of fetchedInfo.current) {
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
      dispatch({
        type: "ADD_FETCHED_EVENTS",
        newEvents: newLoadedEvents
      });
      setLoadingMore(false);
      setError(error);
    };

    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const remainsToBeScrolled = height - winScroll;
      if (remainsToBeScrolled < 100 && !loadingMore) {
        loadMoreEvents();
      }
    };

    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [loadingMore, loadedEvents, dispatch]);

  const classes = useStyles();

  const handleEventTypeChange = (
    selectedEventTypes: IEventType[] | undefined | null
  ) => {
    if (!selectedEventTypes) {
      setSelectedEventTypes([]);
      setNothingToLoad(false);
      return;
    }

    for (const eventType of selectedEventTypes) {
      const hasntFetchedEventType = !fetchedInfo.current.find(
        info => info.eventType === eventType
      );

      if (hasntFetchedEventType) {
        setNothingToLoad(false);
        setPendingFetches(p => p + 1);
        loadEvents(eventType);
      }
    }

    setSelectedEventTypes(selectedEventTypes);
  };

  const loadEvents = async (eventType: IEventType) => {
    try {
      const response = await fetchEvents(eventType);

      fetchedInfo.current.push({
        eventType,
        nextPageQuery: response.pagination.next_page
      });

      setPendingFetches(p => p - 1);

      dispatch({
        type: "ADD_FETCHED_EVENTS",
        newEvents: response.events
      });
    } catch {
      // todo: can be improved, showing more meaningful errors to user
      setPendingFetches(p => p - 1);
      setError(true);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.selector}>
        <EventOptionSelector onChange={handleEventTypeChange} />
      </div>
      <Grid container>
        <Grid xs={12} item>
          <div style={{ height: 10 }}>
            {pendingFetches !== 0 && <LinearProgress />}
          </div>
        </Grid>
        {loadedEvents.map(event => (
          <CardWrapper
            key={event.id}
            event={event}
            hide={!selectedEventTypes.includes(event.type)}
          />
        ))}
      </Grid>
      <div className={classes.loadingContainer}>
        {loadingMore && <CircularProgress />}
        {nothingToLoad && <Typography>No more events to Load</Typography>}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={error}
        autoHideDuration={1000}
        onClose={() => setError(false)}
      >
        <SnackbarContent
          style={{ backgroundColor: "red" }}
          message="Something has gone wrong, please try again!"
        />
      </Snackbar>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  selector: {
    width: "100%"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40
  }
});
