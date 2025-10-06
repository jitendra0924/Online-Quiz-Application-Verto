const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.resolve(__dirname, "quiz.db"), (err) => {
  if (err) console.error("Database error:", err.message);
  else console.log("Connected to SQLite database");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      duration INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quizId INTEGER,
      question TEXT,
      optionA TEXT,
      optionB TEXT,
      optionC TEXT,
      optionD TEXT,
      correctOption TEXT,
      FOREIGN KEY (quizId) REFERENCES quizzes(id)
    )
  `);

  db.get("SELECT COUNT(*) as count FROM quizzes", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO quizzes (name, duration) VALUES ('Java Test', 60)`); 
      db.run(`INSERT INTO quizzes (name, duration) VALUES ('JavaScript Test', 90)`);
    }
  });

  db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
  if (row.count === 0) {
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (1, 'What is JVM in Java?', 'Compiler', 'Interpreter', 'Virtual Machine', 'Loader', 'C')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (1, 'Which keyword is used to inherit a class in Java?', 'super', 'this', 'extends', 'implements', 'C')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (1, 'Which method is the entry point of any Java program?', 'main()', 'start()', 'run()', 'init()', 'A')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (1, 'Which package contains the Collection framework?', 'java.io', 'java.util', 'java.sql', 'java.lang', 'B')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (1, 'Which concept of OOP is achieved by method overloading?', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'B')`);

    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (2, 'Which keyword declares a variable in JS?', 'let', 'var', 'define', 'int', 'A')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (2, "What is the result of '2' + 2 in JS?", '4', "'22'", 'NaN', 'Error', 'B')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (2, 'Which symbol is used for strict equality comparison?', '=', '==', '===', '!==', 'C')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (2, 'Which type is NOT primitive in JavaScript?', 'String', 'Number', 'Object', 'Boolean', 'C')`);
    db.run(`INSERT INTO questions (quizId, question, optionA, optionB, optionC, optionD, correctOption)
            VALUES (2, 'Which function is used to parse JSON in JavaScript?', 'JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'parse.JSON()', 'A')`);
  }
});

});

module.exports = db;
