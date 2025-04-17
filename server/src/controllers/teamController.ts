import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  const teams = await prisma.team.findMany();

  const teamsWithUsernames = await Promise.all(
    teams.map(async (team) => {
      const productOwner = await prisma.user.findUnique({
        where: { userId: team.productOwnerUserId! },
        select: { username: true },
      });
      const productManager = await prisma.user.findUnique({
        where: { userId: team.projectManagerUserId! },
        select: { username: true },
      });

      return {
        ...team,
        productUsername: productOwner?.username,
        projectManagerUsername: productManager?.username,
      };
    })
  );

  res.json(teamsWithUsernames);
};
