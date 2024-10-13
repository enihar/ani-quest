'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import client from '@/apollo-client';
import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  Divider,
} from '@chakra-ui/react';
import AnimeDetail from '@/components/AnimeDetail';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { GetAnimeListResponse, AnimeMedia } from '@/types/anime';
import { GET_ALL_ANIME } from '@/graphql/getAllAnimes';

const AnimePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedAnime, setSelectedAnime] = useState<AnimeMedia | null>(null);
  const perPage = 10;

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage, pathname, searchParams]);

  const handlePreviousPage = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`);
  };

  const { loading, error, data } = useQuery<GetAnimeListResponse>(
    GET_ALL_ANIME,
    {
      variables: { page: currentPage, perPage },
      client,
    }
  );

  if (loading) {
    return (
      <Box py={12}>
        <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={14}>
          {[...Array(10)].map((_, index) => (
            <GridItem key={index}>
              <Skeleton
                height="300px"
                width="100%"
                borderRadius="md"
                startColor="#FAD4D4"
                endColor="#F3E5AB"
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    return <p>No animes found</p>;
  }

  const { pageInfo, media: series } = data.Page;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid
        mt={17}
        templateColumns="repeat(auto-fit, minmax(180px, 1fr))"
        gap={14}
      >
        {series.map((anime: AnimeMedia) => (
          <button
            key={anime.id}
            onClick={() => {
              setSelectedAnime(anime);
              onOpen();
            }}
          >
            <GridItem
              w="100%"
              className="transition transform hover:scale-101 duration-250"
            >
              <Image
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                objectFit="cover"
                height="300px"
                width="100%"
              />

              <Box py={2}>
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  textAlign="left"
                  letterSpacing="0.1"
                >
                  {anime.title.romaji}
                </Text>
              </Box>
            </GridItem>
          </button>
        ))}
      </Grid>

      <Divider style={{ borderColor: 'red' }} mt="5" />

      {/* Pagination */}
      <Box
        mt={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        mb={20}
      >
        <Button
          onClick={() => handlePreviousPage()}
          isDisabled={currentPage === 1}
          variant="solid"
          color="black"
          bg="burntOrange.500"
          leftIcon={<ArrowLeftIcon />}
          borderRadius="full"
          boxShadow="md"
          _hover={{
            bg: 'burntOrange.600',
            transform: 'scale(1.05)',
            boxShadow: 'lg',
          }}
          _active={{ transform: 'scale(0.95)' }}
        >
          Previous
        </Button>

        <Button
          colorScheme="orange"
          variant="outline"
          isDisabled
          borderRadius="full"
          px={6}
          _hover={{ cursor: 'default' }}
        >
          Page {pageInfo.currentPage} of {pageInfo.lastPage}
        </Button>

        <Button
          onClick={() => handleNextPage()}
          isDisabled={!pageInfo.hasNextPage}
          variant="outline"
          color="black"
          bg="burntOrange.500"
          borderRadius="full"
          boxShadow="md"
          _hover={{
            bg: 'burntOrange.600',
            transform: 'scale(1.05)',
            boxShadow: 'lg',
          }}
          _active={{ transform: 'scale(0.95)' }}
          rightIcon={<ArrowRightIcon />}
        >
          Next
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent
          borderRadius={20}
          bgColor="rgba(13, 27, 42)"
          border="1px solid white"
          color="wheat"
          maxH="90vh"
        >
          <ModalCloseButton />
          <ModalBody maxH="80vh" overflowY="auto">
            {selectedAnime && (
              <AnimeDetail
                animeId={selectedAnime?.id}
                onClose={() => {
                  setSelectedAnime(null);
                  onClose();
                }}
              ></AnimeDetail>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimePage />
    </Suspense>
  );
};

export default Page;
