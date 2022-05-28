/* eslint-disable no-unused-vars */
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

const { COOKIE_ACCESS_TOKEN_NAME, JWT_SECRET } = process.env;

type HandlerType = (
  req: NextApiRequest,
  res: NextApiResponse,
  user?: User
) => void;

type JWTobject = {
  id: number;
  email: string;
  time: string;
};

export const validateToken = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error("No secret environment variable set!");
  }

  const user = jwt.verify(token, JWT_SECRET) as JWTobject;
  return user;
};

export const validateRoute = (handler: HandlerType): HandlerType => {
  if (!COOKIE_ACCESS_TOKEN_NAME || !JWT_SECRET) {
    throw new Error("Environment variables missing");
  }

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[COOKIE_ACCESS_TOKEN_NAME];

    if (token) {
      let user;

      try {
        const { id } = validateToken(token);

        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not a user!");
        }
      } catch (e) {
        res.status(401);
        res.json({ error: "Not authorized!" });
        return;
      }
      return handler(req, res, user as unknown as User);
    }

    res.status(401);
    res.json({ error: "Not authorized!" });
  };
};
