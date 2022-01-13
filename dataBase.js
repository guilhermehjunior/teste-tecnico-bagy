const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'teste-bagy.db');

// open the database connection
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
});

const queryCreateTableClients =`
  CREATE TABLE IF NOT EXISTS clientes(
  id INTEGER,
  nomeCompleto TEXT NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  dataNascimento TEXT NOT NULL,
  enderecoId INTEGER NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (enderecoId)
    REFERENCES enderecos (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);`;

const queryCreateTableAddress = `
  CREATE TABLE IF NOT EXISTS enderecos(
  id INTEGER,
  rua TEXT NOT NULL,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  pais TEXT NOT NULL,
  cep TEXT NOT NULL,
  numero INTEGER NOT NULL,
  PRIMARY KEY (id));`;

const queryCreateTableProducts = `
  CREATE TABLE IF NOT EXISTS produtos(
  id INTEGER,
  nome TEXT NOT NULL,
  imagem TEXT,
  descricao TEXT NOT NULL,
  peso FLOAT,
  preco FLOAT NOT NULL,
  estoque INTEGER NOT NULL,
  PRIMARY KEY (id));`;

const queryCreateTableOrders = `
  CREATE TABLE IF NOT EXISTS pedidos(
  id INTEGER,
  dataPedido TEXT NOT NULL,
  parcelas TEXT NOT NULL,
  compradorId INTEGER NOT NULL,
  status TEXT NOT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (compradorId)
    REFERENCES clientes (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);`;

const queryCreateTableOrdersProducts = `
  CREATE TABLE IF NOT EXISTS pedidos_produtos(
  produtoId INTEGER,
  quantidade INTEGER NOT NULL,
  pedidoId INTEGER,
  PRIMARY KEY (produtoId, pedidoId),
  FOREIGN KEY (produtoId) 
     REFERENCES produtos (produtoId) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
  FOREIGN KEY (pedidoId) 
     REFERENCES pedidos (pedidoId) 
        ON DELETE CASCADE
        ON UPDATE CASCADE);`;

const queryInsertAddress = `INSERT INTO enderecos(rua, bairro, cidade, estado, pais, cep, numero) VALUES
  ('Santo Garbuio', 'Xaxim', 'Curitiba', 'PR', 'BR', '81710-320', 127),
  ('Francisco Derosso', 'Xaxim', 'Curitiba', 'PR', 'BR', '82710-320', 3000),
  ('Gabriel Freceiro', 'Cidade Alta', 'Medianeira', 'PR', 'BR', '85884000', 127)`;

const queryInsertClients = `INSERT INTO clientes(nomeCompleto, email, cpf, dataNascimento, enderecoId) VALUES
  ('Guilherme H Jr', 'guilherme@email.com', '99999999999', '12/07/1992', 1),
  ('Alceu Fonseca', 'fonseca@email.com', '88888888888', '20/09/1990', 2),
  ('Rogerio Andrade', 'rogerio@email.com', '77777777777', '12/02/1980', 3)`;

const queryInsertProducts = `INSERT INTO produtos(nome, imagem, descricao, peso, preco, estoque) VALUES
('caneta azul', 'canetaazul.jpg', 'caneta de cor azul', 0.1, 1.99, 100),
('caneta vermelha', 'canetavermelha.png', 'caneta de cor vermelha', 0.1, 1.59, 200),
('caneta verde', 'canetaverde.png', 'caneta de cor verde', 0.2, 2.59, 500)`;

const queryInsertOrders= `INSERT INTO pedidos(dataPedido, parcelas, compradorId, status) VALUES
('31/12/2021', 12, 1, 'ENVIADO'),
('01/01/2022', 2, 2, 'EM SEPARAÇÃO'),
('11/01/2022', 1, 1, 'EM PROCESSAMENTO')`;

const queryInsertOrdersProducts = `INSERT INTO pedidos_produtos(produtoId, quantidade, pedidoId) VALUES
(1, 5, 1),
(2, 10, 1),
(3, 2, 1),
(1, 1, 2),
(2, 1, 2),
(3, 1, 2),
(1, 15, 3),
(2, 15, 3),
(3, 15, 3)`;

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db
    .run(queryCreateTableAddress)
    .run(queryCreateTableClients)
    .run(queryCreateTableProducts)
    .run(queryCreateTableOrders)
    .run(queryCreateTableOrdersProducts)
    .run(queryInsertAddress)
    .run(queryInsertClients)
    .run(queryInsertProducts)
    .run(queryInsertOrders)
    .run(queryInsertOrdersProducts)
    // .all(`SELECT * FROM produtos`, (err, rows) => {
    //   if (err){
    //     throw err;
    //   }
    //   console.log(rows);
    // });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});
