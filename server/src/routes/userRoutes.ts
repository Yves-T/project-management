import express from "express";
import { getUser, getUsers, postUser } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.get("/:cognitoId", getUser);
router.post("/", postUser);

export default router;
