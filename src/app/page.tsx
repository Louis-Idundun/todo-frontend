"use client";

import { createTodo, deleteTodo, getTodos, updateTodo } from "@/services/api";
import { useEffect, useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch todos when component mounts
  useEffect(() => {
    interface Todo {
      _id: string;
      text: string;
      completed: boolean;
    }
    
    const fetchTodos = async () => {
      try {
        const fetchedTodos: Todo[] = await getTodos();
        const normalizedTodos = fetchedTodos.map((todo) => ({
          id: todo._id,
          text: todo.text,
          completed: todo.completed,
        }));
        setTodos(normalizedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
}, []);

  // ADD or UPDATE
  const addOrUpdateTodo = async () => {
    if (!newTodo.trim()) return;

    if (editingId) {
      // update API
      try {
        await updateTodo(editingId, { title: newTodo });
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? { ...todo, text: newTodo } : todo
          )
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
      setEditingId(null);
    } else {
      // create API
      try {
        const created = await createTodo({ text: newTodo, completed: false });
        setTodos([...todos, created]); // assuming backend returns the created todo with id
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }

    setNewTodo("");
  };

  // TOGGLE
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // DELETE
  const deleteTodoApi = async (id: string) => {
    try {
      await deleteTodo(id); // id will now be valid
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // OPEN EDIT MODE
  const editTodo = (id: string, text: string) => {
    setEditingId(id);
    setNewTodo(text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fuchsia-50 p-6">
      <div className="w-full max-w-md bg-gray-600 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-green-600">
          Todo List
        </h1>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addOrUpdateTodo}
            className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 border rounded-md ${
                todo.completed ? "bg-gray-200 line-through" : ""
              }`}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className="cursor-pointer flex-1"
              >
                {todo.text}
              </span>
              <button
                onClick={() => editTodo(todo.id, todo.text)}
                className="text-green-500 hover:text-green-700 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodoApi(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                &#10005;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

