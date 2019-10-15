import { IEventType } from "../../../shared/interfaces";

export interface OptionType {
  label: string;
  value: IEventType;
}

export const SportTypes: OptionType[] = [
  {
    value: "american_football_match",
    label: "American Football Match"
  },
  {
    value: "american_football_outright",
    label: "American Football Outright"
  },
  {
    value: "baseball_match",
    label: "Baseball Match"
  },
  {
    value: "baseball_outright",
    label: "Baseball Outright"
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
    value: "cricket_outright",
    label: "Cricket Outright"
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
    value: "football_outright",
    label: "Football Outright"
  },
  {
    value: "golf_match",
    label: "Golf Match"
  },
  {
    value: "golf_outright",
    label: "Golf Outright"
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
    label: "Mma Match"
  },
  {
    value: "motorsports_race",
    label: "Motorsports Race"
  },
  {
    value: "motorsports_outright",
    label: "Motorsports Outright"
  },
  {
    value: "politics",
    label: "Politics"
  },
  {
    value: "politics_outright",
    label: "Politics Outright"
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
    value: "rugby_league_outright",
    label: "Rugby League Outright"
  },
  {
    value: "rugby_union_match",
    label: "Rugby Union Match"
  },
  {
    value: "rugby_union_outright",
    label: "Rugby Union Outright"
  },
  {
    value: "snooker_match",
    label: "Snooker Match"
  },
  {
    value: "snooker_outright",
    label: "Snooker Outright"
  },
  {
    value: "tennis_match",
    label: "Tennis Match"
  },
  {
    value: "tennis_outright",
    label: "Tennis Outright"
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
    value: "top_level_event",
    label: "Top Level Event"
  },
  {
    value: "tv_entertainment",
    label: "Tv Entertainment"
  }
];
