### teste-tecnico-bagy
Teste técnico realizado no processo seletivo da bagy

# Boas vindas ao repositório do teste técnico da Bagy!

## Iniciando o projeto

Para clonar esse repositório para o seu computador utilizando a chave SSH, abra o terminal e execute o seguinte comando: 

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

Após isso acesse em seu navegador o endpoint `http://localhost:3000/graphql`, nele você vai encontrar uma interface(`GraphiQL`) para realizar as requisições desejadas.

Nesse API de GraphQL é possível fazer 2 tipos de requisições, as `query` e as `mutation`.

`query` são requisições que buscam informação no banco de dado e `mutation` são requisições que alteram o banco de dados.

As `query` disponíveis nesse projeto são:

  -clientes

  -cliente

  -produtos

  -produto

  -pedidos

  -pedido

As `mutation` disponíveis são: 

  -createClient

  -updateClient

  -deleteClient

  -createProduct

  -updateProduct

  -deleteProduct

  -createOrder

  -updateOrder

  -deleteOrder

A GraphQL faz com que as requisições sejam feitas de modo 'gráfico', a pessoa escreve a query ou mutation que deseja e os campos que deseja receber.

Como exemplo, a `query` produtos funciona da seguinte forma(obs: a vírgula é opcional):

```
{
  produtos{
    id,
    nome,
    imagem,
    descricao,
    peso
    preco
    estoque
  }
}
```

Nesse caso estamos solicitando com a `query produtos` que ela retorne todos os produtos no nosso banco de dados e mostre os campos `id`, `nome`, `imagem`, `descrição`, `peso`, `preço` e `estoque`.
 Lembrando que não é necessário requisitar o retorno de todos os dados, só aqueles desejados.

O resultado da query é o seguinte:

![resultado query produtos](./imagens/resultado-produtos.png)

### Query

#### Clientes

A `query` clientes tem a seguinte estrutura e os possíveis dados disponíveis:

```
{
  clientes{
    id,
    nomeCompleto
    email
    cpf
    dataNascimento
    enderecoId
    endereco{
      id
      rua
      bairro
      cidade
      estado
      pais
      cep
      numero
    }
  }
}
```

#### Cliente

A `query` cliente tem a seguinte estrutura e os possíveis dados disponíveis, nela é obrigatório passar o `id` do produto desejado:

```
{
  cliente(id: idDoClient){
    id,
    nomeCompleto
    email
    cpf
    dataNascimento
    enderecoId
    endereco{
      id
      rua
      bairro
      cidade
      estado
      pais
      cep
      numero
    }
  }
}
```

#### Produtos

A `query` produtos tem a seguinte estrutura e os possíveis dados disponíveis:

```
{
  produtos{
    id,
    nome,
    imagem,
    descricao,
    peso
    preco
    estoque
  }
}
```

#### Produto

A `query` produto tem a seguinte estrutura e os possíveis dados disponíveis, nela é obrigatório passar o `id` do produto desejado:


```
{
  produto(id: idDoProduto){
    id,
    nome,
    imagem,
    descricao,
    peso
    preco
    estoque
  }
}
```

#### Pedidos

A `query` pedidos tem a seguinte estrutura e os possíveis dados disponíveis:

```
{
  pedidos{
    id
    produtos{
      produtoId
      produto{
        ...produtos(informações disponíveis na query produtos)
      }
      quantidade
      pedidoId
    }
    dataPedido
    parcelas
    compradorId
    comprador{
      ...clientes(informações disponíveis na query clientes)
    }
  }
}
```

#### Pedido

A `query` pedido tem a seguinte estrutura e os possíveis dados disponíveis, nela é obrigatório passar o `id` do produto desejado:

```
{
  pedido(id: idDoPedido){
    id
    produtos{
      produtoId
      produto{
        ...produtos(informações disponíveis na query produtos)
      }
      quantidade
      pedidoId
    }
    dataPedido
    parcelas
    compradorId
    comprador{
      ...clientes(informações disponíveis na query clientes)
    }
  }
}
```

### Mutations

Na hora de realizar mutations é necessário acrescentar o termo `mutation` antes de realizar a requisição, um exemplo a seguir da createClient:

```
mutation{
  createClient(nomeCompleto: "", email: "", cpf:"", dataNascimento:"", rua: "", bairro: "", cidade: "", estado: "", pais: "", cep: "", numero: 123){
    id
    nomeCompleto
    endereco{
      id
      rua
    }
  }
}
```

Nela são obrigatório os seguintes dados: `nomeCompleto`, `email`, `cpf`, `dataNascimento`, `rua`, `bairro`, `cidade`, `estado`, `pais`, `cep` e `numero` e como retorno ele passa as informações desejadas iguais da `query`
[client](#client).

![resultado mutation createClient](./imagens/resultado-create-client.png)

#### createClient

A `mutation` createClient tem a seguinte estrutura e nela é obrigatório passar os dados `nomeCompleto, email, cpf`