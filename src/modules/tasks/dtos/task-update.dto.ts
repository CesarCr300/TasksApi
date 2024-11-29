import { TaskStatus } from "../entities/task.entity";

export class TaskUpdateDto {
  title: string;
  description: string;
  status: TaskStatus;
}
