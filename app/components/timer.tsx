import React, { useEffect, useMemo, useState } from "react";

interface ITimerProps {
    time: Date;
}


const Timer = ({ time }: ITimerProps) => {
    const calculateTimeLeft = () => {
      const now = new Date();
        let difference = time.getTime() - now.getTime();
        return {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            }
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    const timerComponents: any = [];

      
        timerComponents.push(
          <React.Fragment>
            <span>{timeLeft.days} days</span> <br/>
            <span>{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
          </React.Fragment>
        );

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    return(
        <>
        <span className="text-indigo-700 uppercase text-xs">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </span>
        </>
    )
}

export default Timer;