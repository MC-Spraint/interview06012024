import { ApiProperty } from '@nestjs/swagger';
export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
export class Task {
  @ApiProperty({})
  id: string;

  @ApiProperty({})
  title: string;

  @ApiProperty({})
  description: string;

  @ApiProperty({})
  priority: TaskPriority;

  @ApiProperty({})
  duedate: Date;
}
