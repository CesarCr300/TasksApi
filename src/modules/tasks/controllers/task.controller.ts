import { Request, Response, NextFunction } from "express";
import { TaskUpdateDto } from "../dtos/task-update.dto";
import { TaskCreateDto } from "../dtos/task-create.dto";
import { TaskService } from "../services/task.service";
import redisClient from "../../../persistence/redisClient";

export class TaskController {
  private _service: TaskService;
  constructor(service: TaskService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = "tasks";
      const cachedTasks = await redisClient.get(cacheKey);

      if (cachedTasks) {
        return res.json({ data: JSON.parse(cachedTasks) });
      }

      const tasks = await this._service.getAll();
      await redisClient.set(cacheKey, JSON.stringify(tasks), "EX", 3600);

      res.json({ data: tasks });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const taskDto = req.body as TaskCreateDto;
      const createdTask = await this._service.create(taskDto);
      await redisClient.del("tasks");
      res.json({ message: "Tarea creada correctamente", data: createdTask });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const taskDto = req.body as TaskUpdateDto;
      await this._service.update(id, taskDto);
      await redisClient.del("tasks");
      res.json({ message: "Tarea actualizada correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this._service.delete(id);
      await redisClient.del("tasks");
      res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}