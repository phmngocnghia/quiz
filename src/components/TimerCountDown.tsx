import { Dayjs } from "dayjs";
import { useEffect, useState, useRef } from "preact/hooks";

export const TimerCountDown = (props: {
  onFinishCountDown: () => void;
  duration: Dayjs;
}) => {
  const { onFinishCountDown, duration } = props;
  const [timeLeft, setTimeLeft] = useState(duration);
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
