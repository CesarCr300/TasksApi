import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
}

@Entity("tbl_tasks")
export class Task {
  @PrimaryGeneratedColumn({ name: "int_id" })
  id: number;

  @Column({ name: "vch_title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "vch_description", type: "text", nullable: true })
  description: string;

  @Column({
    name: "vch_status",
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.Pending,
  })
  status: TaskStatus;

  @CreateDateColumn({
    name: "dtt_creation_date",
    type: "datetime",
    default: () => "current_timestamp",
  })
  creationDate: Date;

  @UpdateDateColumn({
    name: "dtt_update_date",
    type: "datetime",
    default: () => "current_timestamp",
  })
  updateDate: Date;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.status = TaskStatus.Pending;
  }
}
