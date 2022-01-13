const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./teste-bagy.db', (err) => {
  if (err) {
    console.error(err.message);
  }
});

const createClientResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      nomeCompleto,
      email,
      cpf,
      dataNascimento,
      rua,
      bairro,
      cidade,
      estado,
      pais,
      cep,
      numero,
    } = args;

    const queryEndereco = `INSERT INTO enderecos(rua, bairro, cidade, estado, pais, cep, numero)
    VALUES ((?), (?), (?), (?), (?), (?), (?))`;
    const queryEndereco2 = `SELECT id FROM enderecos WHERE rua = (?) AND numero = (?) AND cidade = (?)`;
    const queryClientes = `INSERT INTO clientes(nomeCompleto, email, cpf, dataNascimento, enderecoId)
    VALUES ((?), (?), (?), (?), (?))`;
    const queryClientes2 = `SELECT * FROM clientes WHERE nomeCompleto = (?)`;

    db.run(queryEndereco, [rua, bairro, cidade, estado, pais, cep, numero], (_err) => {
      console.log(this);
    });
    db.get(queryEndereco2, [rua, numero, cidade], (err, { id }) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      db.run(queryClientes, [nomeCompleto, email, cpf, dataNascimento, id])
        .get(queryClientes2, [nomeCompleto], (err, row) => {
          if (err) {
            console.log(err.message);
            reject(null);
          }
          resolve(row);
        });
    });
  });
};

const deleteClientResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM clientes WHERE id = (?)', [args.id]);
    resolve({ message: 'Cliente deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

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

    const queryProduct = `INSERT INTO produtos(nome, imagem, descricao, peso, preco, estoque)
    VALUES ((?), (?), (?), (?), (?), (?))`;
    const queryProduct2 = `SELECT * FROM produtos WHERE nome = (?) AND preco = (?)`;

    db.run(queryProduct, [nome, imagem, descricao, peso, preco, estoque])
      .get(queryProduct2, [nome, preco], (err, row) => {
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
    db.run('DELETE FROM produtos WHERE id = (?)', [args.id]);
    resolve({ message: 'Produto deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

const updateQuantity = (productId, quantity) => {
  const queryProduct = `SELECT estoque FROM produtos WHERE id = (?)`;
  const queryProduct2 = `UPDATE produtos SET estoque = (?) WHERE id = (?)`;
  let estoqueFinal = 0;
  db.get(queryProduct, [productId], (err, { estoque }) => {
    if (err) {
      console.log(err.message);
    }
    estoqueFinal = estoque - quantity;
    estoqueFinal >= 0 ? estoqueFinal : estoque;
    db.run(queryProduct2, [estoqueFinal, productId]);
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

    const queryOrder = `INSERT INTO pedidos(dataPedido, parcelas, compradorId, status)
    VALUES ((?), (?), (?), (?))`;
    const queryOrder2 = `SELECT * FROM pedidos WHERE dataPedido = (?) AND compradorId = (?)`;
    const queryOrderProduct = `INSERT INTO pedidos_produtos(produtoId, quantidade, pedidoId)
    VALUES ((?), (?), (?))`;

    db.run(queryOrder, [dataPedido, parcelas, compradorId, status])
      .get(queryOrder2, [dataPedido, compradorId], (err, { id }) => {
        if (err) {
          console.log(err.message);
          reject(null);
        }
        produtos.forEach((produtoId, index) => {
          if (updateQuantity(produtoId, quantidade[index]) < 0) reject(null);
          db.run(queryOrderProduct, [produtoId, quantidade[index], id]);
        });
      });
      db.get(queryOrder2, [dataPedido, compradorId], (err, row) => {
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
    db.run('DELETE FROM pedidos WHERE id = (?)', [args.id]);
    resolve({ message: 'Pedido deletado com sucesso!' });
    reject({ message: 'Algum erro aconteceu.' });
  });
};

module.exports = {
  deleteClientResolver,
  deleteProductResolver,
  deleteOrderResolver,
  createClientResolver,
  createProductResolver,
  createOrderResolver,
};
