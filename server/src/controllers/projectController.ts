import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  const newProject = await prisma.project.create({
    data: { name, description, startDate, endDate },
  });
  res.status(201).json(newProject);
};
