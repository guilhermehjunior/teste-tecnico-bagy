const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const updateQuantity = (productId, quantity) => {
  const querySelectProduct = `SELECT estoque FROM produtos WHERE id = (?)`;
  const queryUpdateProduct = `UPDATE produtos SET estoque = (?) WHERE id = (?)`;
  let estoqueFinal = 0;
  db.get(querySelectProduct, [productId], (err, { estoque }) => {
    if (err) {
      console.log(err.message);
    }
    estoqueFinal = estoque - quantity;
    estoqueFinal >= 0 ? estoqueFinal : estoque;
    db.run(queryUpdateProduct, [estoqueFinal, productId]);
  });
  return estoqueFinal;
};

const createOrderResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      produtos,
      dataPedido,
      parcelas,
      compradorId,
      status,
      quantidade,
    } = args;

    const queryInsertOrder = `INSERT INTO pedidos(dataPedido, parcelas, compradorId, status)
    VALUES ((?), (?), (?), (?))`;
    const querySelectOrderId = `SELECT last_insert_rowid() as id`;
    const querySelectOrder = `SELECT * FROM pedidos WHERE id = (?)`;
    const queryInsertOrderProduct = `INSERT INTO pedidos_produtos(produtoId, quantidade, pedidoId)
    VALUES ((?), (?), (?))`;

    db.run(queryInsertOrder, [dataPedido, parcelas, compradorId, status])
      .get(querySelectOrderId, (err, { id }) => {
        if (err) {
          console.log(err.message);
          reject(null);
        }
        produtos.forEach((produtoId, index) => {
          if (updateQuantity(produtoId, quantidade[index]) < 0) reject(null);
          db.run(queryInsertOrderProduct, [produtoId, quantidade[index], id]);
        });
        db.get(querySelectOrder, [id], (err, row) => {
          if (err) {
            console.log(err.message);
            reject(null);
          }
          resolve(row);
        }); 
      });
  });
};

const updateOrderResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      produtos,
      dataPedido,
      parcelas,
      compradorId,
      status,
      quantidade,
    } = args;

    const queryUpdateOrder = `UPDATE pedidos
    SET dataPedido = (?), parcelas = (?), compradorId = (?), status = (?)
    WHERE id = (?)`;
    const querySelectOrder = `SELECT * FROM pedidos WHERE id = (?)`;
    const queryUpdateOrderProduct = `UPDATE pedidos_produtos
    SET quantidade = (?)
    WHERE pedidoId = (?) AND produtoId = (?)`;

    db.run(queryUpdateOrder, [dataPedido, parcelas, compradorId, status, id])
    produtos.forEach((produtoId, index) => {
      db.run(queryUpdateOrderProduct, [quantidade[index], id, produtoId]);
    });
    db.get(querySelectOrder, [id], (err, row) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      resolve(row);
    });     
  });
};

const deleteOrderResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const deleteOrderQuery = `DELETE FROM pedidos WHERE id = (?)`;
    const deleteOrderProductsQuery = `DELETE FROM pedidos_produtos WHERE pedidoId = (?)`;
    db.run(deleteOrderQuery, [args.id]);
    db.run(deleteOrderProductsQuery, [args.id]);
    resolve({ message: 'Pedido deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

module.exports = {
  createOrderResolver,
  updateOrderResolver,
  deleteOrderResolver,
};
