### teste-tecnico-bagy
Teste técnico realizado no processo seletivo da bagy

# Boas vindas ao repositório do teste técnico da Bagy!

## Iniciando o projeto

Para clonar esse repositório para o seu computador, abra o terminal e execute o seguinte comando: 

```sh
git clone git@github.com:guilhermehjunior/teste-tecnico-bagy.git
```
Ao abrir a pasta do projeto é necessário instalar as dependências, execute no terminal o comando:

```sh
npm install
```

## Desenvolvimento

Para o desenvolvimento dessa API foram utilizadas as stacks `node.js`, `graphql` eo banco de dados `SQLite`.

As seguintes bibliotecas foram utilizadas:

  -express(`node.js`)
  -express-graphql(ligação entre `node.js` e `graphql`)
  -graphql(`graphql`)
  -sqlite3(`SQLite`)

## Base de Dados

Como já mencionado anteriormente, a base de dados utilizada foi a `SQLite`;

E ao utilizar a biblioteca `sqlite3`, ela cria um arquivo com a base de dados no seu projeto, no caso desse, ela fica na raiz do projeto com o nome `teste-bagy.db`;

Na raiz do projeto existe o arquivo `dataBase.js` com todas as queries para criação do banco de dados.

Ela já vem pronta para utilização, mas caso ocorra algum problema ou só se deseje reiniciá-la, basta deletar o arquivo `teste-bagy.db` e executar o seguinte comando em seu terminal:

```sh
node dataBase.js
```

## Utilizando a API

Para iniciar a API e utilizá-la basta executar o comando: 
```sh
npm start
```