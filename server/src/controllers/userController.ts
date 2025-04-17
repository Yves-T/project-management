import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();

  res.json(users);
};
