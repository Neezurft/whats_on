import { IEvent } from "../../../shared/interfaces";
import { tuple } from "../Utils/utils";
import moment from "moment";

const initialState: IEvent[] = [];

// actions

const actionTypes = tuple("ADD_FETCHED_EVENTS");
type ActionType = typeof actionTypes[number];

export interface AddFetchedEventsAction {
  type: ActionType;
  newEvents: IEvent[];
}

export type Action = AddFetchedEventsAction;

// reducers

export const eventsReducer = (
  state: IEvent[] = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_FETCHED_EVENTS":
      let allEvents = [...state, ...action.newEvents];
      allEvents.sort((a, b) =>
        moment(a.start_datetime).diff(moment(b.start_datetime))
      );
      return allEvents;

    default:
      return state;
  }
};
