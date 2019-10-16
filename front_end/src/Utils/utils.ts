import { IEventType, IEvent } from "../../../shared/interfaces";
import config from "../config.json";
import { EventOptions } from "./EventOptions";

const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : config["api-base-url"];

export function fetchEvents(eventType: IEventType) {
  const url = apiBaseUrl + "/events-upcoming?type=" + eventType;
  return fetch(url).then(res => res.json() as Promise<IEvent[]>);
}

export function formUrl(id: string, slug: string) {
  return `https://smarkets.com/event/${id}/${slug}`;
}

export function getEventTypeLabel(type: IEventType) {
  const eventOption = EventOptions.find(e => e.value === type)!;

  return eventOption.label;
}
