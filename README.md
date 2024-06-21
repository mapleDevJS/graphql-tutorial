[![Netlify Status](https://api.netlify.com/api/v1/badges/a91f9b08-dffe-43b5-b540-b968ed225a58/deploy-status)](https://app.netlify.com/sites/graphql-tutorial/deploys)

# My Apollo Client Application

This project is a React application that interacts with the GitHub GraphQL API using Apollo Client.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [GraphQL Queries](#graphql-queries)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the dependencies:

```sh
git clone <repository_url>
cd <repository_directory>
npm install
```

Ensure you add a `.env` file in the root directory and specify your GitHub API token:

```sh
VITE_GITHUB_API_TOKEN=your_github_token_here
```

## Usage

To run the application, use the following command:

```sh
npm run dev
```

This will start the development server, and you can view the app in your browser at `http://localhost:3000`.

## Components

This application includes the following key components:

- **`Apollo Client Setup`**: The setup for Apollo Client, including linking HTTP and authentication headers.
- **`App Component`**: The main React component that renders the application.

## Detailed Explanation

### GraphQL URI

The application connects to the GitHub GraphQL API using the following URI:

```javascript
const GRAPHQL_URI = 'https://api.github.com/graphql';
```

## GraphQL Queries

### Popular Repositories List

This query retrieves a list of repositories with more than 50,000 stars, returning the top 10 results:

```javascript
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

client.query({ query: POPULAR_REPOSITORIES_LIST }).then(console.log);
```

## License

This project is licensed under the MIT License.