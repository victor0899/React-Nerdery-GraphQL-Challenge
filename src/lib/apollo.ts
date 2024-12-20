//comment for review
import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client';


const httpLink = createHttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
          merge(existing = { results: [], info: null }, incoming, { args }) {
            if (!args?.page || args.page === 1) {
              return incoming;
            }

            return {
              ...incoming,
              results: [...(existing.results || []), ...(incoming.results || [])],
            };
          },
        },
      },
    },
  },
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});