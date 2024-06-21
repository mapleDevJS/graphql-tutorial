import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'
import App from './App.jsx'
import './index.css'

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' })

const authLink = setContext((_, { headers }) => {
    const token = import.meta.env.VITE_GITHUB_API_TOKEN
    console.log('token:', token);

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`
        }
    }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)


const POPULAR_REPOSITORIES_LIST = gql`
{
  search(query: "stars:>50000", type: REPOSITORY, first: 10) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          name
          owner {
            login
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }
}
`

client.query({ query: POPULAR_REPOSITORIES_LIST }).then(console.log)
