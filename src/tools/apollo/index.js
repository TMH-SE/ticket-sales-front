import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const protocol = 'http:'
const host = window.location.hostname
const port = process.env.REACT_APP_BE_PORT
const endpoint = 'ticketgraphql'

const urn = process.env.REACT_APP_BE_URN || `${host}${port ? `:${port}` : ''}/${endpoint}`

const httpLink = new HttpLink({
  uri: `${protocol}//${urn}`
})

const wsLink = new WebSocketLink({
  uri: protocol === 'https:' ? `wss://${urn}` : `ws://${urn}`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      token: localStorage.getItem('access-token')
    })
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
  if (graphQLErrors) {
    response.errors = graphQLErrors[0]
  }
  if (networkError) {
    console.log(
      `[Network error ${operation.operationName}]: ${networkError.message}`
    )
  }
})

const link = ApolloLink.from([errorLink, splitLink])

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem('access-token') || ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

export { client }
