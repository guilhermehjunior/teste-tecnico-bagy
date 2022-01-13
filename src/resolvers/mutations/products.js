const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const createProductResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      nome,
      imagem,
      descricao,
      peso,
      preco,
      estoque,
    } = args;

    const queryInsertProduct = `INSERT INTO produtos(nome, imagem, descricao, peso, preco, estoque)
    VALUES ((?), (?), (?), (?), (?), (?))`;
    const querySelectProduct = `SELECT * FROM produtos
    WHERE nome = (?) AND imagem = (?) AND descricao = (?) AND peso = (?) AND preco = (?) AND estoque = (?)`;

    db.run(queryInsertProduct, [nome, imagem, descricao, peso, preco, estoque])
      .get(querySelectProduct, [nome, imagem, descricao, peso, preco, estoque], (err, row) => {
        if (err) {
          console.log(err.message);
          reject(null);
        }
        resolve(row);
      });
  });
};

const updateProductResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      nome,
      imagem,
      descricao,
      peso,
      preco,
      estoque,
    } = args;

    const queryUpdateProduct = `UPDATE produtos
    SET nome = (?), imagem = (?), descricao = (?), peso = (?), preco = (?), estoque = (?)
    WHERE id = (?)`;
    const querySelectProduct = `SELECT * FROM produtos WHERE id = (?)`;

    db.run(queryUpdateProduct, [nome, imagem, descricao, peso, preco, estoque, id])
      .get(querySelectProduct, [id], (err, row) => {
        if (err) {
          console.log(err.message);
          reject(null);
        }
        resolve(row);
      });
  });
};

const deleteProductResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const deleteProductQuery = `DELETE FROM produtos WHERE id = (?)`;
    db.run(deleteProductQuery, [args.id]);
    resolve({ message: 'Produto deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

module.exports = {
  createProductResolver,
  updateProductResolver,
  deleteProductResolver,
};
