import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User | undefined) => {
    if (!user) {
      res.status(401);
      res.json({ error: "Not a user!" });
      return;
    }

    const playlists = await prisma.playlist.findMany({
      where: { userId: user.id },
    });

    res.json(playlists);
  }
);
