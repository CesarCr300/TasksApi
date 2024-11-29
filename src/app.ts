import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { DataSourceSingletone } from "./persistence/datasource";
import { errorHandler } from "./middlewares/error.middleware";
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

const routersLocation = ["./modules/tasks/routes/task.routes"];

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  try {
    const dataSource = DataSourceSingletone.get();
    await dataSource.initialize();
    routersLocation.forEach(async (routerLocation) => {
      const { router } = await import(routerLocation);
      app.use("/", router, errorHandler);
    });
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
    console.log("Server is not running");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  res.status(statusCode).send({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});