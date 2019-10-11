import React from "react";
import "./App.scss";
import PublicIcon from "@material-ui/icons/Public";
import Button from "@material-ui/core/Button";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Button variant="contained" color="primary">
            {"Hello "}
            <span style={{ width: 8 }} />
            <PublicIcon />
          </Button>
        </p>
      </header>
    </div>
  );
};

export default App;
