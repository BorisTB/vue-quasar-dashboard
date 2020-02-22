import './env'
import { GraphQLServer } from 'graphql-yoga'
import { GraphQLSchema } from 'graphql'
import { RootQueryType } from './graphql/types/RootQuery'
import { RootMutationType } from './graphql/mutations/RootMutation'
import { connectToDb, models } from './db'

const db = connectToDb(process.env.MONGO_URI)

const context = {
  db,
  models
}

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

const server = new GraphQLServer({
  schema,
  context
})

const config = {
  port: process.env.SERVER_PORT || 4000
}

server.start(config, () =>
  console.log(`Server is running on http://localhost:${config.port}`)
)
