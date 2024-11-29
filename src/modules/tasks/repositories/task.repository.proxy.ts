import redisClient from "../../../persistence/redisClient";
import { TaskStatus } from "../entities/task.entity";
import { TaskRepository } from "./task.repository";

export class TaskRepositoryProxy {
  private _repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this._repository = repository;
  }

  async create(title: string, description: string) {
    const createdTask = await this._repository.create(title, description);
    this.clearCache();
    return createdTask;
  }

  async update(
    id: number,
    title: string,
    description: string,
    status: TaskStatus
  ) {
    const updated = await this._repository.update(
      id,
      title,
      description,
      status
    );
    this.clearCache();
    return updated;
  }

  async getAll() {
    const cacheKey = "tasks";
    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
      return JSON.parse(cachedTasks);
    }

    const tasks = await this._repository.getAll();
    await redisClient.set(cacheKey, JSON.stringify(tasks), "EX", 3600);
    return tasks;
  }

  async delete(id: number) {
    const deleted = await this._repository.delete(id);
    this.clearCache();
    return deleted;
  }

  private async clearCache() {
    try {
      await redisClient.del("tasks");
    } catch (error) {
      console.log("Error deleting cache", error);
    }
  }
}
