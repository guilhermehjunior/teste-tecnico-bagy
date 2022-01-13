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

module.exports = {
  createClientResolver,
  updateClientResolver,
  deleteClientResolver,
};
