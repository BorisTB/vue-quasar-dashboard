import { GraphQLObjectType, GraphQLString } from 'graphql'
import { globalIdField } from 'graphql-relay'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField(),
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  }
})

export { UserType }
