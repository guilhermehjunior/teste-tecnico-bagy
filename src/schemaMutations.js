const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLID,
} = require('graphql');

const {
  ProductType,
  ClientType,
  OrderType,
  deleteType,
} = require('./types');

const {
  createClientResolver,
  updateClientResolver,
  deleteClientResolver,
} = require('./resolvers/mutations/clients');

const {
  createOrderResolver,
  updateOrderResolver,
  deleteOrderResolver,
} = require('./resolvers/mutations/orders');

const {
  createProductResolver,
  updateProductResolver,
  deleteProductResolver,
} = require('./resolvers/mutations/products');

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    createClient: {
      type: ClientType,
      description: 'add a client and his address',
      args: {
        nomeCompleto: { type: GraphQLNonNull(GraphQLString) } ,
        email: { type: GraphQLNonNull(GraphQLString) },
        cpf: { type: GraphQLNonNull(GraphQLString) } ,
        dataNascimento: { type: GraphQLNonNull(GraphQLString) },
        rua: { type: GraphQLNonNull(GraphQLString) },
        bairro: { type: GraphQLNonNull(GraphQLString) },
        cidade: { type: GraphQLNonNull(GraphQLString) },
        estado: { type: GraphQLNonNull(GraphQLString) },
        pais: { type: GraphQLNonNull(GraphQLString) },
        cep: { type: GraphQLNonNull(GraphQLString) },
        numero: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: createClientResolver,
    },
    updateClient: {
      type: ClientType,
      description: 'update a client',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        nomeCompleto: { type: GraphQLNonNull(GraphQLString) } ,
        email: { type: GraphQLNonNull(GraphQLString) },
        cpf: { type: GraphQLNonNull(GraphQLString) } ,
        dataNascimento: { type: GraphQLNonNull(GraphQLString) },
        rua: { type: GraphQLNonNull(GraphQLString) },
        bairro: { type: GraphQLNonNull(GraphQLString) },
        cidade: { type: GraphQLNonNull(GraphQLString) },
        estado: { type: GraphQLNonNull(GraphQLString) },
        pais: { type: GraphQLNonNull(GraphQLString) },
        cep: { type: GraphQLNonNull(GraphQLString) },
        numero: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: updateClientResolver,
    },
    deleteClient: {
      type: deleteType,
      description: 'delete a client',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteClientResolver,
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
      resolve: createProductResolver,
    },
    updateProduct: {
      type: ProductType,
      description: 'update a Product',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        nome: { type: GraphQLNonNull(GraphQLString) } ,
        imagem: { type: GraphQLNonNull(GraphQLString) },
        descricao: { type: GraphQLNonNull(GraphQLString) } ,
        peso: { type: GraphQLNonNull(GraphQLFloat) },
        preco: { type: GraphQLNonNull(GraphQLFloat) },
        estoque: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: updateProductResolver,
    },
    deleteProduct: {
      type: deleteType,
      description: 'delete a Product',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteProductResolver,
    },
    createOrder: {
      type: OrderType,
      description: 'add a Order',
      args: {
        produtos: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) } ,
        dataPedido: { type: GraphQLNonNull(GraphQLString) },
        parcelas: { type: GraphQLNonNull(GraphQLInt) } ,
        compradorId: { type: GraphQLNonNull(GraphQLInt) },
        status: { type: GraphQLNonNull(GraphQLString) },
        quantidades: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
      },
      resolve: createOrderResolver,
    },
    updateOrder: {
      type: OrderType,
      description: 'update a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        produtos: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) } ,
        dataPedido: { type: GraphQLNonNull(GraphQLString) },
        parcelas: { type: GraphQLNonNull(GraphQLInt) } ,
        compradorId: { type: GraphQLNonNull(GraphQLInt) },
        status: { type: GraphQLNonNull(GraphQLString) },
        quantidades: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
      },
      resolve: updateOrderResolver,
    },
    deleteOrder: {
      type: deleteType,
      description: 'delete a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteOrderResolver,
    },
  }),
});

module.exports = RootMutationType;