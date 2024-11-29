import { Router } from "express";
import { body, param } from "express-validator";
import { TaskRepository } from "../repositories/task.repository";
import { TaskRepositoryProxy } from "../repositories/task.repository.proxy";
import { DataSourceSingletone } from "../../../persistence/datasource";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { asyncWrapper } from "../../../middlewares/asyncWrapper.middleware";
import { validateRequest } from "../../../middlewares/validateRequest.middleware";
import {
  taskCreateValidator,
  taskUpdateValidator,
} from "../validators/task.validators";

const repository = new TaskRepository(DataSourceSingletone.get());
const repositoryProxy = new TaskRepositoryProxy(repository);
const service = new TaskService(repositoryProxy);
const controller = new TaskController(service);

export const router = Router();

router
  .route("/tasks")
  .get(asyncWrapper(controller.getAll.bind(controller)))
  .post([
    ...taskCreateValidator,
    validateRequest,
    asyncWrapper(controller.create.bind(controller)),
  ]);

router
  .route("/tasks/:id")
  .put([
    ...taskUpdateValidator,
    validateRequest,
    asyncWrapper(controller.update.bind(controller)),
  ])
  .delete([
    param("id").isInt(),
    validateRequest,
    asyncWrapper(controller.delete.bind(controller)),
  ]);
