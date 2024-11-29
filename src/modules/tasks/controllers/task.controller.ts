import { Request, Response, NextFunction } from "express";
import { TaskUpdateDto } from "../dtos/task-update.dto";
import { TaskCreateDto } from "../dtos/task-create.dto";
import { TaskService } from "../services/task.service";

export class TaskController {
  private _service: TaskService;

  constructor(service: TaskService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this._service.getAll();
      res.json({ data: tasks });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const taskDto = req.body as TaskCreateDto;
      const createdTask = await this._service.create(taskDto);
      res.status(201).json({ message: "Tarea creada correctamente", data: createdTask });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const taskDto = req.body as TaskUpdateDto;
      await this._service.update(id, taskDto);
      res.json({ message: "Tarea actualizada correctamente" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await this._service.delete(id);
      res.json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}
