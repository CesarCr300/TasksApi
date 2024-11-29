import { Router } from "express";

import { TaskRepository } from "../repositories/task.repository";
import { DataSourceSingletone } from "../../../persistence/datasource";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { asyncWrapper } from "../../../middlewares/asyncWrapper.middleware";
import { TaskRepositoryProxy } from "../repositories/task.repository.proxy";

const repository = new TaskRepository(DataSourceSingletone.get());
const repositoryProxy = new TaskRepositoryProxy(repository);
const service = new TaskService(repositoryProxy);
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
