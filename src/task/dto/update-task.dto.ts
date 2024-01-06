import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/shared/utils/dtos/common-response';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => Task)
  data: Task;
}
