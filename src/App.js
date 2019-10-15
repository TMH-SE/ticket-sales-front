import React from 'react'
import { Provider } from 'mobx-react'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter } from 'react-router-dom'
import { client, store } from './tools'
import Root from './pages'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  )
}

export default App
