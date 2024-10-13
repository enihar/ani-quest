import { gql } from '@apollo/client';

export const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      title {
        romaji
        english
        native
      }
      coverImage {
        medium
      }
      description
      genres
      averageScore
      episodes
      duration
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      studios(isMain: true) {
        nodes {
          name
        }
      }
    }
  }
`;
