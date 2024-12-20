import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
        species
        gender
        location {
          name
        }
        origin {
          name
        }
        episode {
          id
          name
          episode
        }
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        episode
        characters {
          id
        }
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;