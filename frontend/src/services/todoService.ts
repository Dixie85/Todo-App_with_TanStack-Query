import { Todo } from "../types/todo";
// import todos from "../db/todosDb.json"

const API_URL = "http://localhost:8080/todos";

// Get all todos

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error fetching todos');
  const data = await response.json();
  return  data ;
};

// Create a new todo
export const postTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) throw new Error('Error adding todo');
  const data = await response.json();
  return  data ;
};

// Update a todo
export const updateTodo = async (updatedTodo: Todo): Promise<void> => {
  const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) throw new Error('Error updating todo');

  const data = await response.json();
  return data ;
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error deleting todo');
};