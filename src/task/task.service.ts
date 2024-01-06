import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepo } from './task.repo';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { SummaryDto } from './dto/summary.dto';

@Injectable()
export class TaskService {
  constructor(private readonly _taskRepo: TaskRepo) {}

  public async insertTask(data: CreateTaskDto): Promise<Task> {
    const task = await this._taskRepo.insertTask(data);
    return task;
  }

  public async getTaskById(id: string): Promise<Task> {
    const task = await this._taskRepo.getTaskById(id);
    return task;
  }

  public async getTaskByDuedate(date: string): Promise<Task[]> {
    const task = await this._taskRepo.getTaskByDuedate(date);
    return task;
  }

  public async updateTask(id: string, update: UpdateTaskDto): Promise<Task> {
    const task = await this._taskRepo.updateTask(id, update);
    return task;
  }

  public async deleteTaskById(id: string): Promise<Partial<Task>> {
    const res = await this._taskRepo.deleteTaskById(id);
    return res;
  }

  public async getSummary(input: SummaryDto): Promise<Task[]> {
    const task = await this._taskRepo.getTasksByPriority(input);
    return task;
  }
}
