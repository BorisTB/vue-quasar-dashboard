import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { UserType } from '../types/User'
import { getJwtForUser } from '../../auth/getJwtForId'

const logIn = mutationWithClientMutationId({
  name: 'LogIn',
  inputFields: {
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
    },
    token: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async ({ email, password }, ctx, a) => {
    const newUser = {
      email,
      password
    }

    try {
      const user = await ctx.models.User.findOne({ email })

      return user.comparePassword(password, (err, success) => {
        if (success) {
          return {
            user,
            token: getJwtForUser(user)
          }
        }
      })
    } catch (e) {
      console.error(e)

      return {
        user: null,
        token: null
      }
    }
  }
})

export { logIn }
