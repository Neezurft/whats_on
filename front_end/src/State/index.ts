import React from "react";
import { EventsStore } from "./events";

const storesContext = React.createContext({
  eventsStore: new EventsStore()
});

export const useStores = () => React.useContext(storesContext);
