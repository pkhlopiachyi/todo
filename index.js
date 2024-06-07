const express = require('express');
const cors = require('cors');
const sql = require('better-sqlite3');
const app = express();
const port = 6000;
const db = sql('todos.db');

app.use(cors());
app.use(express.json());

app.get('/todos/list', async (req, res) => {
  const data = await db.prepare('SELECT * from todos').all();

  return res.send(data.map((todo) => ({ ...todo, isDone: todo.isDone === 'TRUE' })))
});

app.post('/todos/add', async (req, res) => {
  const newTodo = {...req.body, isDone: "FALSE"}
  await db.prepare(`
    INSERT INTO todos VALUES (
      null,
      @message,
      @isDone
    )
  `).run(newTodo);

  return res.status(200).send({message: 'success'})
});

app.put('/todos/:id', async (req, res) => {
  const newTodo = { isDone: req.body.isDone ? "TRUE" : "FALSE" }
  await db.prepare(`UPDATE todos SET isDone = ? where id = ?`).run(newTodo);

  return res.status(200).send({message: 'success'})
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});