import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepo } from './task.repo';
import { Database } from 'src/shared/database/database.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UtilService } from 'src/shared/utils/util.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepo, UtilService],
})
export class TaskModule {}
