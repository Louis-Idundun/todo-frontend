import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/todos'; //  Backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Fetch all todos
export const getTodos = async () => {
  const response = await api.get('/');
  return response.data;
};

// Create a new todo
export const createTodo = async (todo: { title: string }) => {
  const response = await api.post('/', todo);
  return response.data;
};

// Update a todo
export const updateTodo = async (id: string, updatedTodo: { title: string }) => {
  const response = await api.put(`/${id}`, updatedTodo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  await api.delete(`/${id}`);
};
