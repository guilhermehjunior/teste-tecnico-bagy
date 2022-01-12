const express = require('express');
const expressGraphQL = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'this represents an available product',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    nome: { type: GraphQLNonNull(GraphQLString) },
    imagem: { type: GraphQLString },
    descricao: { type: GraphQLNonNull(GraphQLString) },
    peso: { type: GraphQLFloat },
    preco: { type: GraphQLNonNull(GraphQLFloat) },
    quantidadeEmEstoque: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const app = express();

app.listen(3000, () => console.log('Server on na porta 3000'));
