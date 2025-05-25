'use client';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/taskSlice';
import { AppDispatch } from '../store';
import { motion } from 'framer-motion';

export default function TaskItem({ id, title }: { id: number; title: string }) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      layout
      className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <span>{title}</span>
      <button
        onClick={() => dispatch(deleteTask(id))}
        className="text-red-500 text-lg hover:text-red-700 dark:hover:text-red-400"
        title="Delete Task"
      >
        ✕
      </button>
    </motion.div>
  );
}
