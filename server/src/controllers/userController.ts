import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();

  res.json(users);
};

export const postUser = async (req: Request, res: Response) => {
  const {
    username,
    cognitoId,
    profilePictureUrl = "i1.jpg",
    teamId = 1,
  } = req.body;
  const newUser = await prisma.user.create({
    data: { username, cognitoId, profilePictureUrl, teamId },
  });

  res.json({ message: "User Created Suceessfully", newUser });
};
