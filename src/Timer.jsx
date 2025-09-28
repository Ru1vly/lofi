import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import playIcon from './icons/play.svg';
import pauseIcon from './icons/pause.svg';

const WORK_SESSION_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_SESSION_DURATION = 5 * 60; // 5 minutes in seconds

function Timer() {
  const [isWorkSession, setIsWorkSession] = useState(true);

  const getExpiryTimestamp = (duration) => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + duration);
    return time;
  };

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(WORK_SESSION_DURATION),
    autoStart: false,
    onExpire: () => {
      const newIsWorkSession = !isWorkSession;
      setIsWorkSession(newIsWorkSession);
      const newDuration = newIsWorkSession ? WORK_SESSION_DURATION : BREAK_SESSION_DURATION;
      restart(getExpiryTimestamp(newDuration), true);
    }
  });

  const handleReset = () => {
    setIsWorkSession(true);
    restart(getExpiryTimestamp(WORK_SESSION_DURATION), false);
  };

  const currentSessionType = isWorkSession ? 'Work Session' : 'Break Session';

  return (
    <div className="timer-container">
      <div className="timer-display">
        <span className='timer-display'>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span className='timer-display'>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div className="timer-controls">
        <button onClick={isRunning ? pause : resume} className="timer-button">
          <img src={isRunning ? pauseIcon : playIcon} alt={isRunning ? 'Pause' : 'Start'} className="timer-icon" />
        </button>
        <button onClick={handleReset} className="reset-button">Reset</button>
      </div>
      <div className="text">
        <span>{currentSessionType}</span>
      </div>
    </div>
  );
}

export default Timer;