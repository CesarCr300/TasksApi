import { TaskCreateDto } from "../dtos/task-create.dto";
import { TaskUpdateDto } from "../dtos/task-update.dto";
import { TaskRepositoryProxy } from "../repositories/task.repository.proxy";

export class TaskService {
  private _repository: TaskRepositoryProxy;

  constructor(repository: TaskRepositoryProxy) {
    this._repository = repository;
  }

  async create(dto: TaskCreateDto) {
    return await this._repository.create(dto.title, dto.description);
  }

  async update(id: number, dto: TaskUpdateDto) {
    return await this._repository.update(
      id,
      dto.title,
      dto.description,
      dto.status
    );
  }

  async getAll() {
    return await this._repository.getAll();
  }

  async delete(id: number) {
    return await this._repository.delete(id);
  }
}
