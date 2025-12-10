import React from 'react';
import axios from "axios";

const Form = ({ input, setInput, todos, setTodos }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now().toString(),
      title: input,
      completed: false
    };

    axios.post("http://localhost:5000/api/todos", newTodo)
      .then(res => setTodos(res.data));  // backend returns array

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a Task..."
        className="task-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button className="button-add" type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;
