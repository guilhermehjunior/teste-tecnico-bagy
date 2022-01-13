const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('teste-bagy.db', (err) => {
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

    const queryInsertEndereco = `INSERT INTO enderecos(rua, bairro, cidade, estado, pais, cep, numero)
    VALUES ((?), (?), (?), (?), (?), (?), (?))`;
    const querySelectEnderecoId = `SELECT last_insert_rowid() as id`;
    const queryInsertClientes = `INSERT INTO clientes(nomeCompleto, email, cpf, dataNascimento, enderecoId)
    VALUES ((?), (?), (?), (?), (?))`;
    const querySelectClientes = `SELECT * FROM clientes WHERE nomeCompleto = (?)`;

    db.run(queryInsertEndereco, [rua, bairro, cidade, estado, pais, cep, numero]);
    db.get(querySelectEnderecoId, (err, { id }) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      db.run(queryInsertClientes, [nomeCompleto, email, cpf, dataNascimento, id])
        .get(querySelectClientes, [nomeCompleto], (err, row) => {
          if (err) {
            console.log(err.message);
            reject(null);
          }
          resolve(row);
        });
    });
  });
};

const updateClientResolver = (_parent, args) => {
  return new Promise((resolve, reject) => {
    const {
      id,
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
  
    const queryUpdateCliente = `UPDATE clientes
    SET nomeCompleto = (?), email = (?), cpf = (?), dataNascimento = (?)
    WHERE id = (?)`;
    const querySelectCliente = `SELECT * FROM clientes WHERE id = (?)`;
    const queryUpdateEndereco = `UPDATE enderecos
    SET rua = (?), bairro = (?), cidade = (?), estado = (?), pais = (?), cep = (?), numero = (?)
    WHERE id = (?)`;
  
    db.run(queryUpdateCliente, [nomeCompleto, email, cpf, dataNascimento, id]);
    db.get(querySelectCliente, [id], (err, { enderecoId }) => {
      if (err) {
        console.log(err.message);
        reject(null);
      }
      db.run(queryUpdateEndereco, [rua, bairro, cidade, estado, pais, cep, numero, enderecoId]);
      db.get(querySelectCliente, [id], (err, row) => {
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
    const deleteClientQuery = `DELETE FROM clientes WHERE id = (?)`;
    db.run(deleteClientQuery, [args.id]);
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
  deleteClientResolver,
  deleteProductResolver,
  deleteOrderResolver,
  createClientResolver,
  createProductResolver,
  createOrderResolver,
  updateClientResolver,
  updateProductResolver,
};
