import { Router } from "express";

import { TaskRepository } from "../repositories/task.repository";
import { DataSourceSingletone } from "../../../persistence/datasource";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { asyncWrapper } from "../../../middlewares/asyncWrapper.middleware";

const repository = new TaskRepository(DataSourceSingletone.get());
const service = new TaskService(repository);
const controller = new TaskController(service);

export const router = Router();
router
  .route("/tasks")
  .get(asyncWrapper(controller.getAll.bind(controller)))
  .post(asyncWrapper(controller.create.bind(controller)));

router
  .route("/tasks/:id")
  .put(asyncWrapper(controller.update.bind(controller)))
  .delete(asyncWrapper(controller.delete.bind(controller)));
