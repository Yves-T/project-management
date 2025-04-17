import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  const tasks = await prisma.task.findMany({
    where: { projectId: Number(projectId) },
    include: {
      author: true,
      assignee: true,
      comments: true,
      attachments: true,
    },
  });

  res.json(tasks);
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    },
  });
  res.status(201).json(newTask);
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: Number(taskId) },
    data: {
      status,
    },
  });

  res.json(updatedTask);
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { authorUserId: Number(userId) },
        { assignedUserId: Number(userId) },
      ],
    },
    include: {
      author: true,
      assignee: true,
    },
  });

  res.json(tasks);
};
