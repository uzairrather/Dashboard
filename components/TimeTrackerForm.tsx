'use client';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logTime } from '../store/timeTrackingSlice';
import { AppDispatch } from '../store';

export default function TimeTrackerForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [taskName, setTaskName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const handleStart = () => {
    if (!taskName.trim()) return;
    setIsRunning(true);
    setStartTime(new Date().toISOString());
    const start = Date.now();

    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 1000);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const endTime = new Date().toISOString();
    dispatch(logTime({
      taskName,
      startTime: startTime!,
      endTime,
      duration: elapsed,
    }));

    setTaskName('');
    setElapsed(0);
    setStartTime(null);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter task to track"
        className="border px-4 py-2 rounded mr-4 text-black"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        disabled={isRunning}
      />
      {isRunning ? (
        <button onClick={handleStop} className="bg-red-600 text-white px-6 py-2 rounded">
          Stop ({elapsed}s)
        </button>
      ) : (
        <button onClick={handleStart} className="bg-green-600 text-white px-6 py-2 rounded">
          Start
        </button>
      )}
    </div>
  );
}
