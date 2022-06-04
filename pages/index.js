
import { onError } from "@apollo/client/link/error"
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client'
import React from 'react'
import { Provider } from 'react-redux'
import Megamenu from "../component/Megamenu"
import store from "../Redux/store"


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "https://devapiv2.walcart.com/graphql" })
])


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Megamenu />
      </Provider>

    </ApolloProvider>

  )
}

export default App