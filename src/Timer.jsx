import React, { useMemo } from 'react';
import { useTimer } from 'react-timer-hook';
import playIcon from './icons/play.svg';
import pauseIcon from './icons/pause.svg';

function Timer() {
  const expiryTimestamp = useMemo(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 25 minutes
    return time;
  }, []);

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false });

  const handleReset = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500); // 25 minutes from now
    restart(time, false); // `false` ensures it doesn't auto-start
  };

  return (
    <div className="timer-container">
      <div className="timer-display">
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div className="timer-controls">
        <button onClick={isRunning ? pause : resume} className="timer-button">
          <img src={isRunning ? pauseIcon : playIcon} alt={isRunning ? 'Pause' : 'Start'} className="timer-icon" />
        </button>
        <button onClick={handleReset} className="reset-button">Reset</button>
      </div>
    </div>
  );
}

export default Timer;