import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import App from './App';
import './index.css';

/**
 * The GraphQL URI for the GitHub API.
 *
 * The GRAPHQL_URI variable is a string that contains the URL for the GraphQL endpoint of the GitHub API.
 * By using this URI, clients can send GraphQL queries and mutations to interact with the GitHub platform.
 *
 * The value of GRAPHQL_URI is 'https://api.github.com/graphql'.
 *
 * @type {string}
 */
const GRAPHQL_URI = 'https://api.github.com/graphql';
/**
 * The key used to access the authorization header in a request.
 *
 * @type {string}
 */
const AUTH_HEADER_KEY = 'authorization';

/**
 * Sets the authorization token in the headers by wrapping the Apollo Client's setContext function.
 *
 * @function createAuthLink
 * @returns {Object} - The headers object with the authorization token.
 */
const createAuthLink = () => setContext((_, { headers }) => {
    const token = import.meta.env.VITE_GITHUB_API_TOKEN;
    console.log('token:', token);
    return {
        headers: {
            ...headers,
            [AUTH_HEADER_KEY]: `Bearer ${token}`,
        },
    };
});

/**
 * The `httpLink` variable represents an HTTP link for connecting to a GraphQL server.
 * It is created using the `createHttpLink` function and configured with a URI (Uniform Resource Identifier)
 * pointing to the GraphQL endpoint.
 *
 * @type {object}
 *
 * @property {function} request - The function used to execute requests made using the HTTP link.
 * @property {function} options - The options for configuring the HTTP link behavior, such as the URI.
 *
 * @since - Since the creation of this variable, there have been no changes.
 */
const httpLink = createHttpLink({ uri: GRAPHQL_URI });
/**
 * This variable represents an authentication link that is created through the function `createAuthLink()`.
 * The `createAuthLink()` function returns an authentication link which can be used for user authentication.
 *
 * @type {string}
 */
const authLink = createAuthLink();
/**
 * Represents a composed Apollo Link that combines an authentication link and an HTTP link.
 * The `apolloLink` variable is created by concatenating the `authLink` and `httpLink` links together.
 *
 * @type {ApolloLink}
 * @memberof module:myApp
 */
const apolloLink = authLink.concat(httpLink);

/**
 * Represents a client object that interacts with the Apollo server.
 * @class
 * @constructor
 * @param {Object} options - The options to customize the client behavior.
 * @param {ApolloLink} options.link - The link object to handle the network requests.
 * @param {InMemoryCache} options.cache - The cache object to store the query results.
 */
const client = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
});

/**
 * A GraphQL query string that retrieves a list of popular repositories.
 * The query searches for repositories with more than 50,000 stars and
 * returns the top 10 results.
 *
 * @type {string}
 */
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
`;

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

client.query({ query: POPULAR_REPOSITORIES_LIST }).then(console.log);