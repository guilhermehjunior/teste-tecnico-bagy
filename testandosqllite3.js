const sqlite3 = require('sqlite3').verbose();

// open the database connection
let db = new sqlite3.Database('./teste.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE IF NOT EXISTS greetings(message text)')
    .run(`INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`)
    .all(`SELECT message FROM greetings`, (err, rows) => {
      if (err){
        throw err;
      }
      console.log(rows);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
