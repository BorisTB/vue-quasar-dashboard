import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { UserType } from '../types/User'

const createUser = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    firstName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    user: {
      type: UserType
    }
  },
  mutateAndGetPayload: async (
    { firstName, lastName, email, password },
    ctx
  ) => {
    const newUser = {
      firstName,
      lastName,
      email,
      password
    }

    try {
      const user = await ctx.models.User.create(newUser)

      return {
        user
      }
    } catch (e) {
      console.error(e)

      return {
        user: null
      }
    }
  }
})

export { createUser }
