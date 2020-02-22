import { GraphQLObjectType } from 'graphql'
import { createUser } from './createUser'
import { deleteUser } from './deleteUser'
import { logIn } from './login'

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    createUser,
    deleteUser,
    logIn
  })
})

export { RootMutationType }
