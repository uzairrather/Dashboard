import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, fetchTasks } from '../features/tasks/taskSlice';
import { AppDispatch } from '../store';

export default function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // ✅ typed dispatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const result = await dispatch(addTask({ title, description }));

    if (addTask.fulfilled.match(result)) {
      setTitle('');
      setDescription('');
      dispatch(fetchTasks());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold">Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        rows={3}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
        Add Task
      </button>
    </form>
  );
}
