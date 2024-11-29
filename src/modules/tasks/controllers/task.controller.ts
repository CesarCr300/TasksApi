import { Request, Response } from "express";
import { TaskUpdateDto } from "../dtos/task-update.dto";
import { TaskCreateDto } from "../dtos/task-create.dto";
import { TaskService } from "../services/task.service";

export class TaskController {
  private _service: TaskService;
  constructor(service: TaskService) {
    this._service = service;
  }
  async getAll(req: Request, res: Response) {
    const tasks = await this._service.getAll();
    res.json({ data: tasks });
  }

  async create(req: Request, res: Response) {
    const taskDto = req.body as TaskCreateDto;
    const createdTask = await this._service.create(taskDto);
    res.json({ message: "Tarea creada correctamente", data: createdTask });
  }

  async update(req: Request, res: Response) {
    let id: number;
    try {
      id = parseInt(req.params.id);
    } catch (error) {
      throw error;
    }
    const taskDto = req.body as TaskUpdateDto;
    await this._service.update(id, taskDto);
    res.json({ message: "Tarea actualizada correctamente" });
  }

  async delete(req: Request, res: Response) {
    let id: number;
    try {
      id = parseInt(req.params.id);
    } catch (error) {
      throw error;
    }
    await this._service.delete(id);
    res.json({ message: "Tarea eliminada correctamente" });
  }
}
