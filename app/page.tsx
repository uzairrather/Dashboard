'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchTasks } from '../store/taskSlice';
import TaskItem from '../components/TaskItem';

export default function TaskListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          id="task-input"
          placeholder="Enter new task"
          className="flex-1 border px-4 py-2 rounded-l text-black"
        />
        <button
          onClick={() => {
            const input = document.getElementById('task-input') as HTMLInputElement;
            const title = input.value.trim();
            if (title) {
              dispatch<any>(require('../store/taskSlice').addTask(title));
              input.value = '';
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {tasks.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
    </section>
  );
}
