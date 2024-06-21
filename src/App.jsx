import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

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

const renderRepositoryItem = (edge) => (
    <li key={`${edge.node.owner.login}-${edge.node.name}`}>
      {edge.node.owner.login} / {edge.node.name}: {' '}
      <strong>{edge.node.stargazers.totalCount}</strong>
    </li>
);

const App = graphql(POPULAR_REPOSITORIES_LIST)(props =>
    <ul>
      {props.data.loading ? '' : props.data.search.edges.map(renderRepositoryItem)}
    </ul>
)

export default App