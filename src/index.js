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
  productsQueryResolver,
  productQueryResolver,
  clientsQueryResolver,
  clientQueryResolver,
  ordersQueryResolver,
  orderQueryResolver,
} = require('./resolvers/query');

const {
  clientTypeResolver,
  productByOrderTypeResolver,
  orderTypeBuyerResolver,
  orderTypeProductsResolver,
} = require('./resolvers/type');

const {
  deleteClientResolver,
  deleteOrderResolver,
  deleteProductResolver,
  createClientResolver,
  createProductResolver,
  createOrderResolver,
} = require('./resolvers/mutations');

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
    dataNascimento: { type: GraphQLNonNull(GraphQLString) },
    enderecoId: { type: GraphQLNonNull(GraphQLInt) },
    endereco: {
      type: AdressType,
      resolve: clientTypeResolver,
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
    produtoId: { type: (GraphQLInt) },
    produto: {
      type: ProductType,
      resolve: productByOrderTypeResolver,
    },
    quantidade: { type: (GraphQLInt) },
    pedidoId: { type: (GraphQLInt) },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'this represents a client order',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    produtos: {
      type: GraphQLList(ProductByOrderType),
      resolve: orderTypeProductsResolver,
    },
    dataPedido: { type: GraphQLNonNull(GraphQLString) },
    parcelas: { type: GraphQLNonNull(GraphQLInt) },
    compradorId: { type: GraphQLNonNull(GraphQLInt) },
    comprador: {
      type: ClientType,
      resolve: orderTypeBuyerResolver,
    },
  }),
});

const deleteType = new GraphQLObjectType({
  name: 'Delete',
  description: 'type for messaging when deleting',
  fields: () => ({
    message: { type: GraphQLNonNull(GraphQLString) }
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    products: {
      type: GraphQLList(ProductType),
      description: 'products list',
      resolve: productsQueryResolver,
    },
    product: {
      type: ProductType,
      description: 'one product by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: productQueryResolver,
    },
    clients: {
      type: GraphQLList(ClientType),
      description: 'clients list',
      resolve: clientsQueryResolver,
    },
    client: {
      type: ClientType,
      description: 'one client by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: clientQueryResolver,
    },
    orders: {
      type: GraphQLList(OrderType),
      description: 'orders list',
      resolve: ordersQueryResolver,
    },
    order: {
      type: OrderType,
      description: 'one order by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: orderQueryResolver,
    },
  }),
});

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
      type: deleteType,
      description: 'delete a client',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
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
      type: deleteType,
      description: 'delete a Product',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
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
        quantidade: { type: GraphQLNonNull(GraphQLList(GraphQLInt)) },
      },
      resolve: createOrderResolver,
    },
    updateOrder: {
      type: OrderType,
      description: 'update a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        produtos: { type: GraphQLString } ,
        dataPedido: { type: GraphQLString },
        parcelas: { type: GraphQLInt } ,
        compradorId: { type: GraphQLInt },
        status: { type: GraphQLString },
        quantidade: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {

      },
    },
    deleteOrder: {
      type: deleteType,
      description: 'delete a Order',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: deleteOrderResolver,
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
