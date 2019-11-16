import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducers from "./State";
import "./App.scss";
import Container from "@material-ui/core/Container";
import EventsLoader from "./Components/EventsLoader";

const store = createStore(rootReducers, applyMiddleware(thunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Container maxWidth="md">
          <header className="App-header">
            <p>Smarkets Upcoming Events</p>
          </header>
          <EventsLoader />
        </Container>
      </div>
    </Provider>
  );
};

export default App;
