import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState, AppDispatch } from '../store';
import { logout } from '../features/auth/authSlice';
import { fetchTasks, deleteTask } from '../features/tasks/taskSlice';
import AddTaskForm from '../components/AddTaskForm';

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const token = useSelector((state: RootState) => state.auth.token);
  const { items: tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      dispatch(fetchTasks());
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <AddTaskForm />

      <div>
        <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>

        {loading ? (
          <p className="text-gray-600">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task: any) => (
              <li
                key={task.id}
                className="border p-3 rounded bg-white shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
