import { IAPIResponse, IEvent } from "../../../shared/interfaces";

export default function(response: any): IAPIResponse {
  const events =
    response && response.events && response.events.length !== undefined ? response.events : [];

  const serialisedResponse: IAPIResponse = {
    events: events.filter(filterInvalidEvents).map(serialiseEvent),
    pagination: {
      next_page: (response && response.pagination && response.pagination.next_page) || null
    }
  };

  return serialisedResponse;
}

function serialiseEvent(eventObj: any): IEvent | undefined {
  const { id, name, full_slug, start_datetime, type } = eventObj;

  const event: IEvent = {
    id,
    name,
    full_slug,
    start_datetime,
    type
  };

  return event;
}

function filterInvalidEvents(eventObj: any): boolean {
  const { id, name, full_slug, start_datetime, type } = eventObj;

  if (!id || !name || !full_slug || !start_datetime || !type) {
    return false;
  }

  return true;
}
