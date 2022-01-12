const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

const { produtos, clientes, enderecos } = require('../mockDataBase');
const app = express();

const AdressType = new GraphQLObjectType({
  name: 'Address',
  description: 'this represents an address',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    rua: { type: GraphQLNonNull(GraphQLString) },
    bairro: { type: GraphQLNonNull(GraphQLString) },
    cidade: { type: GraphQLNonNull(GraphQLString) },
    estado: { type: GraphQLNonNull(GraphQLString) },
    pais: { type: GraphQLNonNull(GraphQLString) },
    cep: { type: GraphQLNonNull(GraphQLString) },
    numero: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  description: 'this represents a client',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    nomeCompleto: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    cpf: { type: GraphQLNonNull(GraphQLString) },
    dataDeNascimento: { type: GraphQLNonNull(GraphQLString) },
    enderecoId: { type: GraphQLNonNull(GraphQLInt) },
    endereco: {
      type: AdressType,
      resolve: (client) => enderecos.find((endereco) => endereco.id === client.enderecoId),
    }
  }),
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'this represents an available product',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    nome: { type: GraphQLNonNull(GraphQLString) },
    imagem: { type: GraphQLString },
    descricao: { type: GraphQLString },
    peso: { type: GraphQLFloat },
    preco: { type: GraphQLNonNull(GraphQLFloat) },
    quantidadeEmEstoque: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    products: {
      type: GraphQLList(ProductType),
      description: 'products list',
      resolve: () => produtos,
    },
    clients: {
      type: GraphQLList(ClientType),
      description: 'clients list',
      resolve: () => clientes,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


app.listen(3000, () => console.log('Server on na porta 3000'));
