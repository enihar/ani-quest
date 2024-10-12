import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Collapse,
  Button,
  HStack,
  Skeleton,
  SkeletonText,
  useToast,
} from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import client from '@/apollo-client';
import DOMPurify from 'dompurify';

function AnimeDetailsSkeleton() {
  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="lg">
      <VStack spacing={4} align="start">
        {/* Title Skeleton */}
        <Skeleton height="30px" width="50%" mb={5}>
          <Heading as="h2" size="lg" mb={5}>
            Loading Title...
          </Heading>
        </Skeleton>

        <HStack align="start" spacing={6} w="full" mb={5}>
          {/* Image Skeleton */}
          <Skeleton height="150px" width="100px" borderRadius="md" />

          <Box flex="1">
            {/* Description Skeleton */}
            <SkeletonText noOfLines={3} spacing="4" />
          </Box>
        </HStack>

        {/* Additional Information Skeleton */}
        <SkeletonText noOfLines={1} width="40%" mb="2" />
        <SkeletonText noOfLines={1} width="30%" mb="2" />
        <SkeletonText noOfLines={1} width="20%" mb="2" />
        <SkeletonText noOfLines={1} width="25%" mb="2" />
        <SkeletonText noOfLines={1} width="35%" mb="2" />
      </VStack>
    </Box>
  );
}

const GET_ANIME_DETAILS = gql`
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

function AnimeDetails({
  animeId,
  onClose,
}: {
  animeId: number;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toast = useToast();

  const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {
    variables: { id: animeId },
    skip: !animeId, // Skip the query if `animeId` is not available
    client,
  });

  // Show error toast
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error occurred',
        // description: error.message,
        description: 'There was an error loading the details.',

        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [error, toast]);

  if (!animeId) {
    return null;
  }

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <AnimeDetailsSkeleton></AnimeDetailsSkeleton>
      </Box>
    );
  }

  if (error) {
    onClose();
    return;
  }

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const {
    title,
    coverImage,
    description,
    genres,
    averageScore,
    episodes,
    duration,
    status,
    studios,
  } = data.Media;

  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="lg">
      <VStack spacing={4} align="start">
        <Heading as="h2" size="lg" mb={5}>
          {title.romaji || title.english || title.native}
        </Heading>

        <HStack align="start" spacing={6} w="full" mb={5}>
          <Image src={coverImage.medium} alt={title.romaji} borderRadius="md" />

          <Box flex="1">
            <Box>
              <Collapse startingHeight={75} in={isExpanded}>
                <Box
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                ></Box>
              </Collapse>
              <Button
                variant="link"
                colorScheme="teal"
                onClick={toggleDescription}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          </Box>
        </HStack>

        <Text fontWeight="bold">Genres: {genres.join(', ')}</Text>
        <Text>Status: {status}</Text>
        <Text>Episodes: {episodes}</Text>
        <Text>Duration per Episode: {duration} minutes</Text>
        <Text>Average Score: {averageScore}</Text>
        <Text>
          Studio: {studios.nodes.length > 0 ? studios.nodes[0].name : 'Unknown'}
        </Text>
      </VStack>
    </Box>
  );
}

export default AnimeDetails;
