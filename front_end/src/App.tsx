import React from "react";
import "./App.scss";
import PublicIcon from "@material-ui/icons/Public";
import Button from "@material-ui/core/Button";
import config from "./config.json";

const apiBaseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : config["api-base-url"];

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Button variant="contained" color="primary">
            {"Hello"}
            <span style={{ width: 8 }} />
            <PublicIcon />
          </Button>
          <Test />
        </p>
      </header>
    </div>
  );
};

export default App;

interface State {
  events: any;
}

class Test extends React.Component<{}, State> {
  state: State = {
    events: undefined
  };

  async componentDidMount() {
    const events = await fetch(apiBaseUrl + "/events-upcoming?type=baseball_match").then(res =>
      res.json()
    );

    this.setState({ events });
  }

  render() {
    if (!this.state.events) {
      return null;
    }

    return <p>{JSON.stringify(this.state.events, null, 2)}</p>;
  }
}
