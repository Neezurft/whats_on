import { IEventType, IEvent } from "../../../shared/interfaces";
import config from "../config.json";

const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : config["api-base-url"];

export function fetchEvents(eventType: IEventType) {
  const url = apiBaseUrl + "/events-upcoming?type=" + eventType;
  return fetch(url).then(res => res.json() as Promise<IEvent[]>);
}
