import { gql } from 'apollo-boost'

const CreateUserMutation = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`

const createUser = {
  methods: {
    createUser ({ password, ...user }) {
      this.$apollo.mutate({
        mutation: CreateUserMutation,
        variables: {
          input: {
            password,
            ...user
          }
        },
        update: this.createUserUpdater,
        optimisticResponse: {
          __typename: 'Mutation',
          createUser: {
            __typename: 'CreateUserPayload',
            user: {
              __typename: 'User',
              id: `tempId-${user.firstName}-${user.lastName}-${user.email}`,
              ...user
            }
          }
        }
      })
    },
    createUserUpdater (store, { data: { createUser } }) {
      if (
        !this.$apollo.queries.users ||
        !this.$apollo.queries.users.lastApolloOptions
      ) {
        return
      }

      const { query, variables } = this.$apollo.queries.users.lastApolloOptions

      const data = store.readQuery({ query, variables })
      const edge = {
        __typename: 'UserEdge',
        node: createUser.user
      }
      data.users.edges = [edge, ...data.users.edges]
      data.users.totalCount = data.users.totalCount + 1
      store.writeQuery({ query, data, variables })
    }
  }
}

export { createUser }
