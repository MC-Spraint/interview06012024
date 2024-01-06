import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Task } from '../entities/task.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/shared/utils/dtos/common-response';

export class GetTaskByDuedate {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  date: string;
}

export class GetTaskByDuedateResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => Task)
  data: Task[];
}
