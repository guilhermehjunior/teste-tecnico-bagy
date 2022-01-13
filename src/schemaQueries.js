const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const {
  ProductType,
  ClientType,
  OrderType,
} = require('./types');

const {
  clientQueryResolver,
  clientsQueryResolver,
  orderQueryResolver,
  ordersQueryResolver,
  productQueryResolver,
  productsQueryResolver,
} = require('./resolvers/query');

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    produtos: {
      type: GraphQLList(ProductType),
      description: 'products list',
      resolve: productsQueryResolver,
    },
    produto: {
      type: ProductType,
      description: 'one product by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: productQueryResolver,
    },
    clientes: {
      type: GraphQLList(ClientType),
      description: 'clients list',
      resolve: clientsQueryResolver,
    },
    cliente: {
      type: ClientType,
      description: 'one client by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: clientQueryResolver,
    },
    pedidos: {
      type: GraphQLList(OrderType),
      description: 'orders list',
      resolve: ordersQueryResolver,
    },
    pedido: {
      type: OrderType,
      description: 'one order by Id',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: orderQueryResolver,
    },
  }),
});

module.exports = RootQueryType;