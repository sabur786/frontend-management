import React, { useEffect, useState } from "react";
import {
  getAllTodos,
  deleteTodo,
  completeTodo,
  inCompleteTodo,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        console.log("Fetched todos:", response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function handleUpdateTodo(id) {
    navigate(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then(() => listTodos())
      .catch((error) => console.error("Error deleting todo:", error));
  }

  function markCompleteTodo(id) {
    setLoading(true);
    completeTodo(id)
      .then(() => listTodos())
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function markInCompleteTodo(id) {
    setLoading(true);
    inCompleteTodo(id)
      .then(() => listTodos())
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      <button className="btn btn-primary mb-3" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td style={{ whiteSpace: "nowrap", overflowX: "auto" }}>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => handleUpdateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => markCompleteTodo(todo.id)}
                    disabled={todo.completed || loading}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => markInCompleteTodo(todo.id)}
                    disabled={!todo.completed || loading}
                  >
                    InComplete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
