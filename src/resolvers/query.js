const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const productsQueryResolver = () => {
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

const productQueryResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM produtos WHERE id = (?);', [args.id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      resolve(row);
    });
  });
};

const clientsQueryResolver = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clientes', (err, rows) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(rows);
    });
  });
};

const clientQueryResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM clientes WHERE id = (?);', [args.id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      resolve(row);
    });
  });
};

const ordersQueryResolver = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pedidos', (err, rows) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(rows);
    });
  });
};

const orderQueryResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM pedidos WHERE id = (?);', [args.id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      resolve(row);
    });
  });
};

module.exports = {
  productsQueryResolver,
  productQueryResolver,
  clientsQueryResolver,
  clientQueryResolver,
  ordersQueryResolver,
  orderQueryResolver,
};
