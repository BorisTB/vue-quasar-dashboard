import { GraphQLNonNull, GraphQLID } from 'graphql'
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay'
import { UserType } from '../types/User'

const deleteUser = mutationWithClientMutationId({
  name: 'DeleteUser',
  inputFields: {
    userId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    deletedUserId: {
      type: GraphQLID
    }
  },
  mutateAndGetPayload: async ({ userId }, ctx) => {
    try {
      await ctx.models.User.findByIdAndDelete(fromGlobalId(userId).id)

      return {
        deletedUserId: userId
      }
    } catch (e) {
      console.error(e)

      return {
        deletedUserId: null
      }
    }
  }
})

export { deleteUser }
