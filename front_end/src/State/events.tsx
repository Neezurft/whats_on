import { observable, action } from "mobx";
import { IEvent } from "../../../shared/interfaces";
import moment from "moment";

export class EventsStore {
  @observable
  events: IEvent[] = [];

  @action
  setEvents(newEvents: IEvent[]) {
    const allEvents = [...this.events, ...newEvents];
    allEvents.sort((a, b) =>
      moment(a.start_datetime).diff(moment(b.start_datetime))
    );
    this.events = allEvents;
  }
}
