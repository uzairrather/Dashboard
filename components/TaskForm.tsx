'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { AppDispatch } from '../store';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask(title));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Enter new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-4 py-2 rounded w-full text-black"
      />
      <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded shadow-md"
    >
      Add
    </button>

    </form>
  );
}
