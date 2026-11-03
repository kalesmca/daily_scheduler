import axios from "axios";

const API_URL = "http://localhost:8080/api/todos";

export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTaskById = async (task) => {
  const response = await axios.put(
    `${API_URL}/${task.id}`,
    task
  );
  return response.data;
};

export const deleteTaskById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

