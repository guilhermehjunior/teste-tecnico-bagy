const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const deleteClientResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM clientes WHERE id = (?)', [args.id]);
    resolve({ message: 'Cliente deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

const deleteProductResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM produtos WHERE id = (?)', [args.id]);
    resolve({ message: 'Produto deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

const deleteOrderResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM pedidos WHERE id = (?)', [args.id]);
    resolve({ message: 'Pedido deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

module.exports = {
  deleteClientResolver,
  deleteProductResolver,
  deleteOrderResolver,
};
