import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Task, TaskPriority } from '../entities/task.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/shared/utils/dtos/common-response';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  priority: TaskPriority;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  duedate: string;
}
export class CreateTaskResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => Task)
  data: Task;
}
