import { gql } from 'apollo-boost'

const DeleteUserMutation = gql`
  mutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      deletedUserId
    }
  }
`

const deleteUser = {
  methods: {
    deleteUser (userId) {
      this.$apollo.mutate({
        mutation: DeleteUserMutation,
        variables: {
          input: {
            userId
          }
        },
        update: this.deleteUserUpdater,
        optimisticResponse: {
          __typename: 'Mutation',
          deleteUser: {
            __typename: 'DeleteUserPayload',
            deletedUserId: userId
          }
        }
      })
    },
    deleteUserUpdater (store, { data: { deleteUser } }) {
      if (
        !this.$apollo.queries.users ||
        !this.$apollo.queries.users.lastApolloOptions
      ) {
        return
      }

      const { query, variables } = this.$apollo.queries.users.lastApolloOptions

      const data = store.readQuery({ query, variables })
      data.users.edges = [...data.users.edges].filter(
        ({ node }) => node.id !== deleteUser.deletedUserId
      )
      data.users.totalCount = data.users.totalCount - 1
      store.writeQuery({ query, data, variables })
    }
  }
}

export { deleteUser }
