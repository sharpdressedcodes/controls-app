import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { ServerInfo, ApolloServer } from 'apollo-server';
import controlSchema from './schemas/controls';
import controlResolver from './resolvers/controls';

/* eslint-disable no-console */
(async function run(
    typeDefs: DocumentNode | Array<DocumentNode> | string | Array<string>,
    resolvers: IResolvers | Array<IResolvers>
) {
    try {
        const server: ApolloServer = new ApolloServer({
            typeDefs,
            resolvers
        });
        const listener: ServerInfo = await server.listen();

        console.log(`GraphQL Server ready at ${listener.url}`);
    } catch (err) {
        console.error(err);
    }
}(controlSchema, controlResolver));
/* eslint-enable no-console */
