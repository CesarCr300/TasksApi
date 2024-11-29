import { body, param } from "express-validator";
import { TaskStatus } from "../entities/task.entity";

export const taskCreateValidator = [
  body("title").isString().notEmpty().trim().escape(),
  body("description").optional().isString().trim().escape(),
];

export const taskUpdateValidator = [
  param("id").isInt().trim().escape(),
  ...taskCreateValidator,
  body("completed").optional().isBoolean(),
  body("status")
    .isString()
    .isIn([TaskStatus.Pending, TaskStatus.InProgress, TaskStatus.Completed]),
];

export const taskRemoveValidator = [param("id").isInt().trim().escape()];
