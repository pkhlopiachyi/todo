const sql = require('better-sqlite3');
const db = sql('todos.db');

const dummyTodos = [
   {
      message: 'Create webpage',
      isDone: "TRUE",
   },
   {
      message: 'Clean desk',
      isDone: "FALSE",
   }
]

db.prepare(`
   CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL,
      isDone TEXT NOT NULL
   )
`).run();

async function initData() {
   const stmt = db.prepare(`
      INSERT INTO todos VALUES (
         null,
         @message,
         @isDone
      )
   `);

   for (const todo of dummyTodos) {
      stmt.run(todo);
   }
}

initData();
