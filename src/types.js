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
  clientTypeResolver,
  orderTypeBuyerResolver,
  orderTypeProductsResolver,
  productByOrderTypeResolver,
} = require('./resolvers/type');

const AdressType = new GraphQLObjectType({
  name: 'Address',
  description: 'this represents an address',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
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
    id: { type: GraphQLNonNull(GraphQLID) },
    nomeCompleto: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    cpf: { type: GraphQLNonNull(GraphQLString) },
    dataNascimento: { type: GraphQLNonNull(GraphQLString) },
    enderecoId: { type: GraphQLNonNull(GraphQLID) },
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
    id: { type: GraphQLNonNull(GraphQLID) },
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
    produtoId: { type: (GraphQLID) },
    produto: {
      type: ProductType,
      resolve: productByOrderTypeResolver,
    },
    quantidade: { type: (GraphQLInt) },
    pedidoId: { type: (GraphQLID) },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'this represents a client order',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    produtos: {
      type: GraphQLList(ProductByOrderType),
      resolve: orderTypeProductsResolver,
    },
    dataPedido: { type: GraphQLNonNull(GraphQLString) },
    parcelas: { type: GraphQLNonNull(GraphQLInt) },
    compradorId: { type: GraphQLNonNull(GraphQLID) },
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

module.exports = {
  deleteType,
  OrderType,
  ProductByOrderType,
  ProductType,
  ClientType,
  AdressType,
};
