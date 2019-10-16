import React from "react";
import "./App.scss";
import Container from "@material-ui/core/Container";
import EventsLoader from "./Components/EventsLoader";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container maxWidth="md">
        <header className="App-header">
          <p>Smarkets Upcoming Events</p>
        </header>
        <EventsLoader />
      </Container>
    </div>
  );
};

export default App;
