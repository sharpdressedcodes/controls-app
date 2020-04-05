const { ApolloServer } = require('apollo-server');

const controlSchema = require('./schemas/controls');
const controlResolver = require('./resolvers/controls');

/* eslint-disable no-console */
(async function run(typeDefs, resolvers) {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers
        });
        const listener = await server.listen();

        console.log(`GraphQL Server ready at ${listener.url}`);
    } catch (err) {
        console.error(err);
    }
}(controlSchema, controlResolver));
/* eslint-enable no-console */
