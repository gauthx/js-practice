import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("test.db");

db.exec(
  `
	CREATE TABLE IF NOT EXISTS fruits (
	   fruit TEXT,
	   price INTEGER
	);
  `,
);

db.prepare(
  `
	INSERT INTO people (name, age) VALUES (?, ?);
  `,
).run("Bob", 40);
const rows = db.prepare("SELECT id, name, age FROM people").all();
console.log("People:");
for (const row of rows) {
  console.log(row);
}
db.close();