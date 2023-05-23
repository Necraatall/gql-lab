import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './graphql'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    // playground: true
})

const app = express()
server.applyMiddleware({ app })

app.listen({ post: 4000 }, () =>
    // console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    console.log(`🚀  Server ready at http://localhost:4000`)
)
