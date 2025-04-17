import bodyParser from "body-parser";
import cors from "cors";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import helmet from "helmet";
import morgan from "morgan";
import projectRoutes from "./routes/projectRoutes";
import searchRoutes from "./routes/searchRoutes";
import taskRoutes from "./routes/taskRoutes";
import teamRoutes from "./routes/teamRoutes";
import userRoutes from "./routes/userRoutes";

// route import

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// error handler
const jsonErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

// routes
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);
app.use(jsonErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("This is home route");
});

// server

const port = Number(process.env.NODE_PORT) || 3002;

app.listen(port, () => console.log(`Server running on port ${port}`));
