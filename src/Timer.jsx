import React, { useState, useEffect } from 'react';
import playIcon from './icons/play.svg';
import pauseIcon from './icons/pause.svg';

const WORK_SESSION_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_SESSION_DURATION = 5 * 60; // 5 minutes in seconds

function Timer() {
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [seconds, setSeconds] = useState(WORK_SESSION_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      const newIsWorkSession = !isWorkSession;
      setIsWorkSession(newIsWorkSession);
      setSeconds(newIsWorkSession ? WORK_SESSION_DURATION : BREAK_SESSION_DURATION);
      setIsRunning(true); // Auto-start the next session
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, isWorkSession]);

  const handleReset = () => {
    setIsWorkSession(true);
    setSeconds(WORK_SESSION_DURATION);
    setIsRunning(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const currentSessionType = isWorkSession ? 'Work Session' : 'Break Session';

  return (
    <div className="timer-container">
      <div className="timer-display">
        <span className='timer-display'>{minutes < 10 ? `0${minutes}` : minutes}</span>:<span className='timer-display'>{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</span>
      </div>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)} className="timer-button">
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
