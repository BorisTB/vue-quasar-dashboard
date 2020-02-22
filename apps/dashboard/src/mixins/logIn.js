import { gql } from 'apollo-boost'
import { setAuthToken } from '../utils/auth'

const LogInMutation = gql`
  mutation($input: LogInInput!) {
    logIn(input: $input) {
      token
    }
  }
`

const logIn = {
  methods: {
    async logIn ({ password, email }) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: LogInMutation,
          variables: {
            input: {
              password,
              email
            }
          }
        })

        const {
          logIn: { token }
        } = data
        setAuthToken(token)
        this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    }
  }
}

export { logIn }
