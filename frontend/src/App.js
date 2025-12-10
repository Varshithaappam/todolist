import React,{ useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import Form from './components/Form';
import Header from './components/Header';
import TodoList from './components/Todolist';

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("api/todos")
    .then(res => setTodos(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <div className='app-wrapper'>
        <Header/>
        <Form input={input} setInput={setInput} todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos}/>
      </div>
    </div>
  );
}

export default App;
