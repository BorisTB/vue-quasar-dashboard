import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql'
import { mrType, mrArgs, mrResolve } from 'mongo-relay-connection'
import { connectionFromPromisedArray } from 'graphql-relay'
import { UserType } from './User'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    me: {
      type: UserType
    },
    users: {
      type: mrType('User', UserType),
      args: {
        ...mrArgs,
        page: {
          type: GraphQLInt
        },
        orderBy: {
          type: GraphQLString
        },
        desc: {
          type: GraphQLBoolean
        }
      },
      resolve: (parent, args, { models }) => {
        const query: any = {}
        const config: any = {}

        if (args.orderBy) {
          config.cursorField = args.orderBy === 'id' ? '_id' : args.orderBy
          config.direction = args.desc ? -1 : 1
        }

        return mrResolve(args, models.User, query, config)
      }
    }
  })
})

export { RootQueryType }
