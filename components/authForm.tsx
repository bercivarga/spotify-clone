import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, FormEvent, useState } from "react";
// import { useSWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutations";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await auth(mode, { email, password });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        direction="column"
        gap={4}
        height="100px"
      >
        <NextImage src="/trax_logo.svg" width={120} height={60} />
        <Divider />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired marginY={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" bg="green.500" w="full" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
