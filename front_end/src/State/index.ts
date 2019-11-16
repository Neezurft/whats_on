import { combineReducers } from "redux";
import { eventsReducer, Action as EventAction } from "./events";
import { IEvent } from "../../../shared/interfaces";

export interface StoreState {
  events: IEvent[];
}

export type Action = EventAction;

export default combineReducers<StoreState>({
  events: eventsReducer
});
