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

const {
  products,
  product,
} = require('./resolvers');


const { produtos, clientes, enderecos, pedidos, produtosPorPedido } = require('../mockDataBase');
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
    estoque: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const ProductByOrderType = new GraphQLObjectType({
  name: 'ProductByOrder',
  description: 'products and quantitys in each order',
  fields: () => ({
    productId: { type: (GraphQLInt) },
    product: {
      type: ProductType,
      resolve: (order) => produtos.find((produto) => produto.id === order.productId),
    },
    quantity: { type: (GraphQLInt) },
    orderId: { type: (GraphQLInt) },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'this represents a client order',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    products: {
      type: GraphQLList(ProductByOrderType),
      resolve: (order) => produtosPorPedido.filter((pedido) => pedido.orderId === order.id),
    },
    dataCriacao: { type: GraphQLNonNull(GraphQLString) },
    parcelas: { type: GraphQLNonNull(GraphQLInt) },
    buyerId: { type: GraphQLNonNull(GraphQLInt) },
    buyer: {
      type: ClientType,
      resolve: (order) => clientes.find((cliente) => order.buyerId === cliente.id),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    products: {
      type: GraphQLList(ProductType),
      description: 'products list',
      resolve: products,
    },
    product: {
      type: ProductType,
      description: 'one product by Id',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: product ,
    },
    clients: {
      type: GraphQLList(ClientType),
      description: 'clients list',
      resolve: () => clientes,
    },
    client: {
      type: ClientType,
      description: 'one client by Id',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_parent, args) => clientes.find((cliente) => cliente.id === args.id),
    },
    orders: {
      type: GraphQLList(OrderType),
      description: 'orders list',
      resolve: () => pedidos,
    },
    order: {
      type: OrderType,
      description: 'one order by Id',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_parent, args) => pedidos.find((pedido) => pedido.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createClient: {
      type: ClientType,
      description: 'add a client',
      args: {
        nomeCompleto: { type: GraphQLNonNull(GraphQLString) } ,
        email: { type: GraphQLNonNull(GraphQLString) },
        CPF: { type: GraphQLNonNull(GraphQLString) } ,
        dataNascimento: { type: GraphQLNonNull(GraphQLString) },
        rua: { type: GraphQLNonNull(GraphQLString) },
        bairro: { type: GraphQLNonNull(GraphQLString) },
        cidade: { type: GraphQLNonNull(GraphQLString) },
        estado: { type: GraphQLNonNull(GraphQLString) },
        pais: { type: GraphQLNonNull(GraphQLString) },
        cep: { type: GraphQLNonNull(GraphQLString) },
        numero: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
    updateClient: {
      type: ClientType,
      description: 'update a client',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        nomeCompleto: { type: GraphQLString } ,
        email: { type: GraphQLString },
        CPF: { type: GraphQLString } ,
        dataNascimento: { type: GraphQLString },
        rua: { type: GraphQLString },
        bairro: { type: GraphQLString },
        cidade: { type: GraphQLString },
        estado: { type: GraphQLString },
        pais: { type: GraphQLString },
        cep: { type: GraphQLString },
        numero: { type: GraphQLInt },
      },
      resolve: (parent, args) => {

      },
    },
    deleteClient: {
      type: ClientType,
      description: 'delete a client',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
    createProduct: {
      type: ProductType,
      description: 'add a Product',
      args: {
        nome: { type: GraphQLNonNull(GraphQLString) } ,
        imagem: { type: GraphQLNonNull(GraphQLString) },
        descricao: { type: GraphQLNonNull(GraphQLString) } ,
        peso: { type: GraphQLNonNull(GraphQLFloat) },
        preco: { type: GraphQLNonNull(GraphQLFloat) },
        estoque: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
    updateProduct: {
      type: ProductType,
      description: 'update a Product',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        nome: { type: GraphQLString } ,
        imagem: { type: GraphQLString },
        descricao: { type: GraphQLString } ,
        peso: { type: GraphQLFloat },
        preco: { type: GraphQLFloat },
        estoque: { type: GraphQLInt },
      },
      resolve: (parent, args) => {

      },
    },
    deleteProduct: {
      type: ProductType,
      description: 'delete a Product',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
    createOrder: {
      type: OrderType,
      description: 'add a Order',
      args: {
        products: { type: GraphQLNonNull(GraphQLString) } ,
        dataCriacao: { type: GraphQLNonNull(GraphQLString) },
        parcelas: { type: GraphQLNonNull(GraphQLInt) } ,
        buyerId: { type: GraphQLNonNull(GraphQLInt) },
        status: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {

      },
    },
    updateOrder: {
      type: OrderType,
      description: 'update a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        products: { type: GraphQLString } ,
        dataCriacao: { type: GraphQLString },
        parcelas: { type: GraphQLInt } ,
        buyerId: { type: GraphQLInt },
        status: { type: GraphQLString },
      },
      resolve: (parent, args) => {

      },
    },
    deleteOrder: {
      type: OrderType,
      description: 'delete a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


app.listen(3000, () => console.log('Server on na porta 3000'));
