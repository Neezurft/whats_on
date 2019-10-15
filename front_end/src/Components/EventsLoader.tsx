import React from "react";
import EventTypeSelector from "./EventTypeSelector";
import EventCard from "./EventCard";
import Grid from "@material-ui/core/Grid";
import { IEvent, IEventType } from "../../../shared/interfaces";
import { fetchEvents } from "../Utils/utils";

interface State {
  loadedEvents: IEvent[];
}

export default class EventsLoader extends React.Component<{}, State> {
  state: State = {
    loadedEvents: []
  };

  selectedEventTypes: IEventType[] = [];

  render() {
    return (
      <React.Fragment>
        <Grid xs={12} sm={3}>
          <EventTypeSelector onChange={this.handleEventTypeChange} />
        </Grid>
        <Grid xs={12} sm={9}>
          {this.state.loadedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </Grid>
      </React.Fragment>
    );
  }

  handleEventTypeChange = (selectedEventTypes: IEventType[] | undefined | null) => {
    if (!selectedEventTypes) {
      this.selectedEventTypes = [];
      this.setState({ loadedEvents: [] });
      return;
    }

    for (const eventType of selectedEventTypes) {
      if (!this.selectedEventTypes.includes(eventType)) {
        this.loadEvents(eventType);
      }
    }

    this.selectedEventTypes = selectedEventTypes;

    this.cleanUp();
  };

  loadEvents(eventType: IEventType) {
    console.log("fetching: " + eventType);
    fetchEvents(eventType).then(loadedEvents =>
      this.setState({ loadedEvents: [...this.state.loadedEvents, ...loadedEvents] })
    );
  }

  cleanUp = () => {
    console.log("cleaning up");
    const relevantEvents = this.state.loadedEvents.filter(event =>
      this.selectedEventTypes.includes(event.type)
    );

    this.setState({ loadedEvents: relevantEvents });
  };
}
