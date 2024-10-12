import { Box, Heading, Text, List, ListItem, Button } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Box
      maxW={{ base: '95%', md: '90%', lg: '1000px' }}
      mx="auto"
      p={{ base: 10, lg: 20 }}
      textAlign="left"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      bg="rgba(13, 27, 42, 0.7)"
      borderRadius="lg"
      boxShadow="lg"
      marginY={{ base: 5, md: 10, lg: 20 }}
      shadow="2xl"
    >
      <Text
        mb={8}
        color="white"
        fontSize={{ base: '3xl', md: '5xl', lg: '7xl' }}
      >
        Dive into a vibrant world of anime like never before.
      </Text>

      <Heading as="h2" size="2xl" mb={4} color="goldenYellow.500">
        Explore, Track, and Connect
      </Heading>
      <List spacing={3} mb={8} width="100%" color="lightGray.400">
        <ListItem>
          <Text as="span" fontWeight="bold">
            Discover New Anime
          </Text>
          : Find the latest trending series and timeless classics. Let our
          recommendations guide your next watch.
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Track Your Journey
          </Text>
          : Keep an organized list of the anime you've watched and those you're
          planning to start.
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Join the Community
          </Text>
          : Share your experiences, discuss story arcs, and connect with fellow
          fans worldwide.
        </ListItem>
      </List>

      <Button
        as="a"
        href="/information"
        size="lg"
        bg="burntOrange.500"
        _hover={{ bg: 'burntOrange.600' }}
        alignSelf="center"
        mt={5}
      >
        Embark on Your Journey
      </Button>
    </Box>
  );
};

export default HomePage;
