import axios from 'axios';

const API_BASE_URL = 'https://todo-backend-avpy.onrender.com'; //  Backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

type CreateTodoType = {
  text: string
  completed: boolean
}

// Fetch all todos
export const getTodos = async () => {
  const response = await api.get('/todos/fetch');
  return response.data;
};

// Create a new todo
export const createTodo = async (params: CreateTodoType) => {
  const response = await api.post('/todos/create', params);
  return response.data;
};

// Update a todo
export const updateTodo = async (id: string, updatedTodo: { title: string }) => {
  const response = await api.put(`/todos/update/${id}`, updatedTodo);
  return response.data;
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  await api.delete(`/todos/delete/${id}`);
};
