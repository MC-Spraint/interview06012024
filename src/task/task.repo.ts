import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Database } from 'src/shared/database/database.service';
import { Logger } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SummaryDto } from './dto/summary.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskRepo {
  private readonly logger = new Logger(TaskRepo.name);

  constructor(private readonly databaseService: Database) {}

  public async insertTask(data: CreateTaskDto): Promise<Task> {
    const parameters = [...Object.values(data)];
    const query =
      `INSERT INTO tasks (` +
      Object.keys(data)
        .map((key) => `${key}`)
        .join(', ') +
      ') VALUES (' +
      Object.values(data)
        .map((value, index) => `$${index + 1}`)
        .join(', ') +
      ') RETURNING *;';
    const [newEntity] = await this.databaseService.query<Task>(
      query,
      parameters,
    );
    return newEntity;
  }

  public async getTaskById(id: string): Promise<Task> {
    const parameters = [id];
    const query = `SELECT * FROM tasks WHERE id=$1;`;
    const [data] = await this.databaseService.query<Task>(query, parameters);
    return data;
  }

  public async getTaskByDuedate(date: string): Promise<Task[]> {
    const parameters = [date];
    const query = `SELECT * FROM tasks WHERE duedate=$1;`;
    const data = await this.databaseService.query<Task>(query, parameters);
    return data;
  }

  public async updateTask(id: string, update: UpdateTaskDto): Promise<Task> {
    const parameters = [...Object.values(update), id];
    const query =
      'UPDATE tasks SET ' +
      Object.keys(update)
        .map((key, index) => `${key} = $${index + 1}`)
        .join(', ') +
      ` WHERE id = $${parameters.length} RETURNING *;`;
    const [updateTask] = await this.databaseService.query<Task>(
      query,
      parameters,
    );
    if (!updateTask) throw new NotFoundException('Task Not Found!');
    return updateTask;
  }

  public async deleteTaskById(id: string): Promise<Partial<Task>> {
    const parameters = [id];
    const query = `DELETE FROM tasks WHERE id=$1 RETURNING *;`;
    const [data] = await this.databaseService.query<Task>(query, parameters);
    if (!data) throw new NotFoundException('Task Not Found');
    return data;
  }

  public async getTasksByPriority({ priority }: SummaryDto): Promise<Task[]> {
    const parameters = [priority];
    const query = `
    SELECT *
    FROM tasks
    WHERE 
      duedate >= current_date::date
      AND duedate <= (current_date + interval '7 days')::date
    AND priority=$1;
    

`;
    const data = await this.databaseService.query<Task>(query, parameters);
    return data;
  }
}
