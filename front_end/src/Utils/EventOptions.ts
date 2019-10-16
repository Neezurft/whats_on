import { IEventType } from "../../../shared/interfaces";

export interface OptionType {
  label: string;
  value: IEventType;
}

export const EventOptions: OptionType[] = [
  {
    value: "american_football_match",
    label: "American Football Match"
  },
  {
    value: "baseball_match",
    label: "Baseball Match"
  },
  {
    value: "basketball_match",
    label: "Basketball Match"
  },
  {
    value: "boxing_match",
    label: "Boxing Match"
  },
  {
    value: "cricket_match",
    label: "Cricket Match"
  },
  {
    value: "current_affairs",
    label: "Current Affairs"
  },
  {
    value: "cycling",
    label: "Cycling"
  },
  {
    value: "darts_match",
    label: "Darts Match"
  },
  {
    value: "darts_outright",
    label: "Darts Outright"
  },
  {
    value: "football_match",
    label: "Football Match"
  },
  {
    value: "golf_match",
    label: "Golf Match"
  },
  {
    value: "handball_match",
    label: "Handball Match"
  },
  {
    value: "horse_racing_race",
    label: "Horse Racing Race"
  },
  {
    value: "ice_hockey_match",
    label: "Ice Hockey Match"
  },
  {
    value: "mma_match",
    label: "MMA Match"
  },
  {
    value: "motorsports_race",
    label: "Motorsports Race"
  },
  {
    value: "politics",
    label: "Politics"
  },
  {
    value: "rowing",
    label: "Rowing"
  },
  {
    value: "rugby_league_match",
    label: "Rugby League Match"
  },
  {
    value: "rugby_union_match",
    label: "Rugby Union Match"
  },
  {
    value: "snooker_match",
    label: "Snooker Match"
  },
  {
    value: "tennis_match",
    label: "Tennis Match"
  },
  {
    value: "volleyball_match",
    label: "Volleyball Match"
  },
  {
    value: "generic",
    label: "Generic"
  },
  {
    value: "tv_entertainment",
    label: "Tv Entertainment"
  }
];
