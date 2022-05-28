import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User | undefined) => {
    if (!user) {
      throw new Error("No user found");
    }

    const playListCount = await prisma.playlist.count({
      where: {
        userId: user.id,
      },
    });

    res.json({ ...user, playListCount });
  }
);
