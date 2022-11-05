import dayjs from "dayjs";
import { useEffect, useState, useRef } from "preact/hooks";
import dayjsDuration from "dayjs/plugin/duration";

dayjs.extend(dayjsDuration);

const test = dayjs.duration(2, "seconds");

export const TimerCountDown = (props: { onFinishCountDown: () => void }) => {
  const { onFinishCountDown } = props;
  const [timeLeft, setTimeLeft] = useState(test);
  const intervalIdRef = useRef<number>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft.subtract({ seconds: 1 }));
    }, 1000);

    intervalIdRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (timeLeft.asMilliseconds() === 0) {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      onFinishCountDown();
    }
  }, [timeLeft, onFinishCountDown]);

  return <div>Time left: {timeLeft.format("HH:mm:ss")}</div>;
};
