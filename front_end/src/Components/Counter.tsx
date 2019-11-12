import React, { useEffect, useState } from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";

interface Props {
  startTime: string;
  onTimerStop: () => void;
}

export default ({ startTime, onTimerStop }: Props) => {
  const [counterDisplay, setCounterDisplay] = useState(getCounterDisplay(startTime));

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const clear = () => {
      if (interval) clearInterval(interval);
    };

    const updateTimer = () => {
      const newTime = getCounterDisplay(startTime);

      if (newTime === StartedString) {
        clear(); // no need to keep updating the counter...
        onTimerStop();
      }

      setCounterDisplay(newTime);
    };

    interval = setInterval(updateTimer, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startTime, onTimerStop]);

  return (
    <Typography variant="subtitle2" component="p">
      {counterDisplay}
    </Typography>
  );
};

const StartedString = "00:00:00";

const getCounterDisplay = (time: string) => {
  let diff = moment(time).diff(moment.now());

  const milisecondsInAnHour = 3600000;
  const milisecondsInADay = 86400000;

  if (diff < 0) {
    return StartedString;
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
};
