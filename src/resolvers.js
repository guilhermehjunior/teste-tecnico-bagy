const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const products = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM produtos', (err, rows) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(rows);
    });
  });
};

const product = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM produtos WHERE id = (?);', [args.id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(row);
    });
  });
};

module.exports = {
  products,
  product,
};