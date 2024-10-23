import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import db from "./database";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// GET all todos
app.get("/todos", (req: Request, res: Response) => {  
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST a new todo
app.post("/todos", (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const query = `INSERT INTO todos (title, completed) VALUES (?, ?)`;

  db.run(query, [title, completed ? 1 : 0], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// PUT (update) a todo
app.put("/todos/:id", (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const { id } = req.params;

  const query = `UPDATE todos SET title = ?, completed = ? WHERE id = ?`;

  db.run(query, [title, completed ? 1 : 0, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ updatedID: id });
  });
});

// DELETE a todo
app.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `DELETE FROM todos WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
