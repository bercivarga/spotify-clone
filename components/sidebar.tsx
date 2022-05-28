import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdLibraryMusic,
  MdSearch,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import NextImage from "next/image";
import NextLink from "next/link";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favourites",
    icon: MdFavorite,
    route: "/favourites",
  },
];

const Sidebar = () => {
  const { playLists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/trax_logo.svg" height={60} width={120} />
        </Box>
        <Box>
          <List spacing={2}>
            {navMenu.map((menuItem) => (
              <ListItem key={menuItem.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={menuItem.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menuItem.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menuItem.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider width="calc(100% - 40px)" marginY="20px" marginLeft="20px" />
        <Box>
          <List spacing={2}>
            {musicMenu.map((menuItem) => (
              <ListItem paddingX="20px" fontSize="16px" key={menuItem.name}>
                <LinkBox>
                  <NextLink href={menuItem.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menuItem.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menuItem.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playLists.map((playList) => (
              <ListItem paddingX="20px" key={playList.id}>
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playList.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playList.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
