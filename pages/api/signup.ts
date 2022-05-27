// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";

const { COOKIE_ACCESS_TOKEN_NAME, JWT_SECRET } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!COOKIE_ACCESS_TOKEN_NAME || !JWT_SECRET) {
    throw new Error("Environment variables are not properly set!");
  }

  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_ACCESS_TOKEN_NAME, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};
