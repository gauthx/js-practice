import { DatabaseSync } from "node:sqlite";

const ROWS = 100_000;

const db = new DatabaseSync("perf_test.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    age INTEGER,
    created_at TEXT
  );
`);

const insert = db.prepare(`
  INSERT INTO users (name, email, age, created_at)
  VALUES (?, ?, ?, ?)
`);

const startTime = Date.now()
console.log({startTime});

db.exec("BEGIN TRANSACTION");

for (let i = 0; i < ROWS; i++) {
  insert.run(
    `User_${i}`,
    `user_${i}@example.com`,
    Math.floor(Math.random() * 60) + 18,
    new Date().toISOString(),
  );
}

db.exec("COMMIT");

const endTime = Date.now()
console.log({ endTime });

console.log("time took:",endTime - startTime)

db.close();
