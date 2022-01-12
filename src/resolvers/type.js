const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const clientTypeResolver = (client) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM enderecos WHERE id = (?)', [client.enderecoId], (err, row) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(row);
    });
  });
};

const productByOrderTypeResolver = (order) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM produtos WHERE id = (?)', [order.produtoId], (err, row) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(row);
    });
  });
};

const orderTypeProductsResolver = (order) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM pedidos_produtos WHERE pedidoId = (?)', [order.id], (err, rows) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(rows);
    });
  });
};

const orderTypeBuyerResolver = (order) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM clientes WHERE id = (?)', [order.compradorId], (err, row) => {
      if (err) {
        console.log(err.message);
        reject([]);
      }
      resolve(row);
    });
  });
};

module.exports = {
  clientTypeResolver,
  productByOrderTypeResolver,
  orderTypeProductsResolver,
  orderTypeBuyerResolver,
};
