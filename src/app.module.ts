import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TaskModule, TaskModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
