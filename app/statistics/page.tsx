'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchTasks } from '../../src/features/tasks/taskSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StatisticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const taskStats = tasks.reduce((acc: Record<string, number>, task: any) => {
    const date = new Date(task.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(taskStats),
    datasets: [
      {
        label: 'Tasks Created Per Day',
        data: Object.values(taskStats),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📊 Task Statistics</h1>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="bg-white rounded shadow p-4">
          <Bar data={data} />
        </div>
      )}
    </div>
  );
}
