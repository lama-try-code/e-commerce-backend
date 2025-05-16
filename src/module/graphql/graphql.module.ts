import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { join } from "path";
@Module({
    //this context in register below is used to pass the request and response objects to the resolvers
    //also passes the user jwt to the resolvers
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req, res }) => ({ req, res }),
            installSubscriptionHandlers: true,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
            //faqing cache control
            cache: 'bounded',
            //the persisted queries are used to cache the queries
            //this is used to optimize the performance of the graphql server
            //this is used to cache the queries in the server side
            persistedQueries: false,
            plugins: [
                ApolloServerPluginCacheControl({
                    defaultMaxAge: 60,
                    calculateHttpHeaders: true,
                }),
            ]
        })
    ]
})
export class GraphqlModule { }
