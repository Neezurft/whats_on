import React from "react";
import "./App.scss";
import Grid from "@material-ui/core/Grid";
import EventsLoader from "./Components/EventsLoader";

const App: React.FC = () => {
  return (
    <div className="App">
      <Grid xs={12}>
        <header className="App-header">
          <p>Smarkets Upcoming Events</p>
        </header>
      </Grid>
      <Grid xs={12}>
        <EventsLoader />
      </Grid>
    </div>
  );
};

export default App;
