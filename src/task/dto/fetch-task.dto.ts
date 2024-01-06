import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { Type } from 'class-transformer';
import { CommonResponse } from 'src/shared/utils/dtos/common-response';

export class FetchTaskResponse extends CommonResponse {
  @ApiProperty()
  @Type(() => Task)
  data: Task;
}
