# Backend - Todo App API

This is the backend for the Todo App, built with Express and SQLite. It provides a RESTful API to perform CRUD operations on a `todos` table in an SQLite database.

## Features

- Get all todos
- Add a new todo
- Update an existing todo
- Delete a todo

## Prerequisites

- Node.js (>= 12.x)
- SQLite3

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the server**:

   ```bash
   npm run dev
   ```
   The server will be running on http://localhost:8080

3. **Database**:

  The database (todos.db) will be created automatically in the root directory with a todos table if it doesn't exist.

## API Endpoints

* GET /todos: Fetch all todos
* POST /todos: Add a new todo
* PUT /todos/:id: Update a todo by ID
* DELETE /todos/:id: Delete a todo by ID

## SQLite Database Structure

The todos table has the following structure:

```bash
CREATE TABLE todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL CHECK (completed IN (0, 1))
);
```