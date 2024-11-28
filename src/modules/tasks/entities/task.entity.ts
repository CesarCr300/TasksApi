import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  })
  status: "Pending" | "In Progress" | "Completed";

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
    this.status = "Pending";
  }
}
