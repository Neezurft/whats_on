export interface IEvent {
  full_slug: string;
  id: string;
  name: string;
  start_datetime: string;
  type: IEventType;
}

export interface IAPIResponse {
  events: IEvent[];
  pagination: {
    next_page: string | null;
  };
}

export type IEventType =
  | "american_football_match"
  | "american_football_outright"
  | "baseball_match"
  | "baseball_outright"
  | "basketball_match"
  | "boxing_match"
  | "cricket_match"
  | "cricket_outright"
  | "current_affairs"
  | "cycling"
  | "darts_match"
  | "darts_outright"
  | "football_match"
  | "football_outright"
  | "golf_match"
  | "golf_outright"
  | "handball_match"
  | "horse_racing_race"
  | "ice_hockey_match"
  | "mma_match"
  | "motorsports_race"
  | "motorsports_outright"
  | "politics"
  | "politics_outright"
  | "rowing"
  | "rugby_league_match"
  | "rugby_league_outright"
  | "rugby_union_match"
  | "rugby_union_outright"
  | "snooker_match"
  | "snooker_outright"
  | "tennis_match"
  | "tennis_outright"
  | "volleyball_match"
  | "generic"
  | "top_level_event"
  | "tv_entertainment";
