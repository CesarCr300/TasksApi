import { DataSource, Repository } from "typeorm";
import { Task, TaskStatus } from "../entities/task.entity";

export class TaskRepository {
  private _repository: Repository<Task>;
  constructor(dataSource: DataSource) {
    this._repository = dataSource.getRepository(Task);
  }

  async create(title: string, description: string) {
    const entity = this._repository.create({
      ...new Task(title, description),
    });
    await this._repository.save(entity);
    return entity;
  }

  async getAll() {
    return await this._repository.find();
  }

  async update(
    id: number,
    title: string,
    description: string,
    status: TaskStatus
  ) {
    const updateResult = await this._repository.update(
      { id: id },
      { title, description, status }
    );

    return updateResult.affected > 0;
  }

  async delete(id: number) {
    const deleteResult = await this._repository.delete(id);
    return deleteResult.affected > 0;
  }
}
