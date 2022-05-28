import { FC } from "react";
import { Artist } from "@prisma/client";
import { GetServerSideProps } from "next";
import {
  Avatar,
  Box,
  Flex,
  VStack,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";

interface IProps {
  artists: Artist[];
}

const Home: FC<IProps> = ({ artists }) => {
  const { user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <Center bg="black" w="full" h="full">
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return (
      <Box p={10} width="full" height="full" bg="red" color="white">
        <Text size="2xl" fontWeight="bold">
          Something went wrong...
        </Text>
        <Text size="2xl" fontWeight="bold" marginTop={4}>
          If there was something here before, then the server is probably down.
        </Text>
      </Box>
    );
  }

  return (
    <GradientLayout
      color="blue"
      title={user.userName}
      description={`You've ${user.playListCount} awesome playlists waiting for you`}
      subtitle="home"
      image={user.image}
      roundImage
    >
      <Box color="white" marginX="20px">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="sm" color="whiteAlpha.700">
            Only visible to you
          </Text>
        </Box>
        <Flex marginTop="20px" gap="8px">
          {artists.map((artist) => (
            <VStack
              key={artist.id}
              w="20%"
              align="start"
              padding="20px"
              bg="gray.900"
              borderRadius="3px"
            >
              <Avatar name={artist.name} size="xl" />
              <Text fontSize="md" fontWeight="semibold" marginTop="8px">
                {artist.name}
              </Text>
              <Text fontSize="sm">Artist</Text>
            </VStack>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: { artists },
  };
};

export default Home;
