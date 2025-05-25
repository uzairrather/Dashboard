import axios from 'axios';

const API = 'http://localhost:5000/api/tasks';

// 🔹 Get all tasks
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 🔹 Create a new task
export const createTask = async (taskData: { title: string; description: string }) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(API, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
