const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage
let todos = [];

// -------------------- API ROUTES -------------------------
app.get('/api/todos', (req, res) => {
  res.json(todos);   // return array always
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json(todos);   // return full array
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: true } : todo
  );
  res.json(todos);   // return full array
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.json(todos);   // return full array
});

// -------------------- SERVE REACT FRONTEND -------------------------
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// -------------------- START SERVER -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
