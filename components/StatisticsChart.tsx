'use client';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function StatisticsChart() {
  const logs = useSelector((state: RootState) => state.timeTracking.logs);

  // Group logs by task name and sum durations (in minutes)
  const groupedData = logs.reduce<Record<string, number>>((acc, log) => {
    const start = new Date(log.startTime);
    const end = new Date(log.endTime);
    const duration = Math.max(0, (end.getTime() - start.getTime()) / 60000); // minutes

    acc[log.taskName] = (acc[log.taskName] || 0) + duration;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([taskName, duration]) => ({
    taskName,
    duration: Math.round(duration),
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Time Spent per Task</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500">No data to show yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="taskName" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="duration" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
