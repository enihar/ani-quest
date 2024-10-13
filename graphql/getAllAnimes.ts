import { gql } from '@apollo/client';

export const GET_ALL_ANIME = gql`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
        }
        genres
        averageScore
      }
    }
  }
`;
