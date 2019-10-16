import { IEventType, IAPIResponse } from "../../../shared/interfaces";
import config from "../config.json";
import { EventOptions } from "./EventOptions";

const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : config["api-base-url"];

export function fetchEvents(eventType: IEventType) {
  const url = `${apiBaseUrl}/events-upcoming?state=upcoming&sort=display_order,start_datetime,name&type=${eventType}`;
  return fetch(url).then(res => res.json() as Promise<IAPIResponse>);
}

export function fetchMoreEvents(nextPageQuery: string) {
  const url = `${apiBaseUrl}/events-upcoming${nextPageQuery}`;
  return fetch(url).then(res => res.json() as Promise<IAPIResponse>);
}

export function formUrl(id: string, slug: string) {
  return `https://smarkets.com/event/${id}${slug}`;
}

export function getEventTypeLabel(type: IEventType) {
  const eventOption = EventOptions.find(e => e.value === type);

  return (eventOption && eventOption.label) || "";
}
