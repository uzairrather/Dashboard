'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TimeTrackerForm from '../../components/TimeTrackerForm';
import TimeLogItem from '../../components/TimeLogItem';

export default function TimeTrackingPage() {
  const logs = useSelector((state: RootState) => state.timeTracking.logs);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Time Tracking</h1>
      <TimeTrackerForm />
      <div>
        {logs.length === 0 ? (
          <p className="text-gray-500">No time logs recorded yet.</p>
        ) : (
          logs.map((log) => (
                    <TimeLogItem
                    key={log.id}
                    taskName={log.taskName}
                    startTime={log.startTime}
                    endTime={log.endTime}
                  />

          ))
        )}
      </div>
    </section>
  );
}
