import { Box } from "@chakra-ui/react";
import { Playlist } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const PlayList: FC<{ playlist: Playlist }> = ({ playlist }) => {
  return <Box>{playlist.name}</Box>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: Number(query.id),
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default PlayList;
