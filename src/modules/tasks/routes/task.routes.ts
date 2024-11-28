import { Router } from "express";

import { TaskRepository } from "../repositories/task.repository";
import { DataSourceSingletone } from "../../../database/datasource";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";

const repository = new TaskRepository(DataSourceSingletone.get());
const service = new TaskService(repository);
const controller = new TaskController(service);

export const router = Router();
router
  .route("/tasks")
  .get(controller.getAll.bind(controller))
  .post(controller.create.bind(controller));

router
  .route("/tasks/:id")
  .put(controller.update.bind(controller))
  .delete(controller.delete.bind(controller));
