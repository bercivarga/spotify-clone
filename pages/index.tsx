import { FC } from "react";
import { Artist } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Avatar, Box, Flex, VStack, Text } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

interface IProps {
  artists: Artist[];
}

const Home: FC<IProps> = ({ artists }) => {
  return (
    <GradientLayout
      color="blue"
      title="bercivarga"
      description="home page lorem ipsum"
      subtitle="home"
      image="https://avatars.githubusercontent.com/u/65171545?v=4"
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
