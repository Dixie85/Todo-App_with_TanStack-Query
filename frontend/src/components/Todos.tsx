import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  postTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";
import { Todo } from "../types/todo";

const Todos = () => {
  // Access the clientconst
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // Fetch todos
  const { isPending, error, data, isFetching } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Create a todo
  const createMutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Update a todo
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Delete a todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isFetching) return <p>Updating...</p>;
  if (error) return <p>Something went wrong...</p>;

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return;
    createMutation.mutate({ title: newTodoTitle, completed: false });
    setNewTodoTitle("");
  };

  return (
    <section className="main-section">
      <h1>Todo List</h1>

      <ul className="list-container">
        {data?.map((todo) => (
          <li className="list-item" key={todo.id}>
            <span className={`${ todo.completed ? 'span-text-decoration': ''}`}
            >
              {todo.title}
            </span>
            <div className="list-item_button-container">
              <button
                onClick={() =>
                  updateMutation.mutate({ ...todo, completed: !todo.completed })
                }
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteMutation.mutate(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <input
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </section >
  );
};
export default Todos;
