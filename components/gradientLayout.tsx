import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FC } from "react";

interface IGradientLayout {
  color: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage: boolean;
}

const GradientLayout: FC<IGradientLayout> = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  return (
    <Box
      height="full"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, .95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            objectFit="cover"
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            alt={title}
            borderRadius={roundImage ? "full" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="xx-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl" fontWeight="black">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="100">
            {description}
          </Text>
        </Box>
      </Flex>
      <Flex paddingY="50px">{children}</Flex>
    </Box>
  );
};

export default GradientLayout;
