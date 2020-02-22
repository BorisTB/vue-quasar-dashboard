import { ApolloClient } from 'apollo-client'
import VueApollo from 'vue-apollo'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getAuthToken } from '../utils/auth'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})
const authLink = setContext((_, { headers }) => {
  const token = getAuthToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

export default async ({ app, Vue }) => {
  Vue.use(VueApollo)

  app.apolloProvider = apolloProvider
}
