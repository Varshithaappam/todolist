import React from 'react'
import axios from "axios";

const TodoList = ({todos, setTodos}) => {

  const handleComplete = (todo) => {
    axios.put(`/api/todos/${todo.id}`)
      .then(() =>
        setTodos(todos.map(item =>
          item.id === todo.id ? { ...item, completed: true } : item
        ))
      );
  };

  const handleDelete = ({ id }) => {
    axios.delete(`/api/todos/${id}`)
      .then(() =>
        setTodos(todos.filter(todo => todo.id !== id))
      );
  };

  return (
    <div>
      {todos.map(todo => (
        <li className="list-item" key={todo.id}>
          <input
            type='text'
            className={`list ${todo.completed ? "complete" : ""}`}
            value={todo.title}
            onChange={(e) => e.preventDefault()}
          />
          <div>
            <button className="button-complete task-button" onClick={() => handleComplete(todo)}>
              <i className="fa fa-check-circle"></i>
            </button>
            <button className="button-delete task-button" onClick={() => handleDelete(todo)}>
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default TodoList;
