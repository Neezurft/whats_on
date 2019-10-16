import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

interface Props {
  startTime: string;
  onTimerStop: () => void;
}

export default class Timer extends React.Component<Props> {
  interval: NodeJS.Timeout | null = null;

  componentDidMount() {
    this.initialiseCounter();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return (
      <div>
        <Typography variant="subtitle2" component="p">
          {this.getCounterDisplay()}
        </Typography>
      </div>
    );
  }

  initialiseCounter = async () => {
    this.interval = setInterval(() => this.forceUpdate(), 1000);
  };

  stopTimer() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  getCounterDisplay() {
    let diff = moment(this.props.startTime).diff(moment.now());

    const milisecondsInAnHour = 3600000;
    const milisecondsInADay = 86400000;

    if (diff < 0) {
      this.stopTimer(); // no need to keep updating the counter.
      this.props.onTimerStop();
      return "00:00:00";
    }

    let counterDisplay = "";

    if (diff > milisecondsInADay) {
      const days = Math.floor(diff / milisecondsInADay);
      diff -= days * milisecondsInADay;
      counterDisplay += `${days}d `;
    }

    const hours = Math.floor(diff / milisecondsInAnHour);
    diff -= hours * milisecondsInAnHour;
    counterDisplay += `${("0" + hours).slice(-2)}:`;

    return counterDisplay + moment(diff).format("mm:ss");
  }
}
