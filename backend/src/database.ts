import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./todos.db');

// Initialize the table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
    )
  `);
});

export default db;
