import { ApiProperty } from '@nestjs/swagger';
import { Task, TaskPriority } from '../entities/task.entity';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/shared/utils/dtos/common-response';

export class SummaryDto {
  @ApiProperty({ enum: Object.keys(TaskPriority) })
  @IsString()
  @IsNotEmpty()
  @IsEnum(TaskPriority, {
    message: 'Priority must be one of these ' + Object.keys(TaskPriority),
  })
  priority: TaskPriority;
}

export class SummaryResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => Task)
  data: Task[];
}
