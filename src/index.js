const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./schemaQueries');
const RootMutationType = require('./schemaMutations');

const app = express();
const PORT = process.env.PORT || 3000;

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))


app.listen(PORT, () => console.log(`Server on na porta ${PORT}`));
