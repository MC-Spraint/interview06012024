import { Controller, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, CreateTaskResponse } from './dto/create-task.dto';
import { UtilService } from 'src/shared/utils/util.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/utils/dtos/success-response.enum';
import { Task } from './entities/task.entity';
import { Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { FetchTaskResponse } from './dto/fetch-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  GetTaskByDuedate,
  GetTaskByDuedateResponse,
} from './dto/get-task-by-duedate.dto';
import { Delete } from '@nestjs/common';
import { SummaryDto, SummaryResponse } from './dto/summary.dto';
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly _utilService: UtilService,
  ) {}

  @ApiOperation({ description: 'Create Taks' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create task!',
    type: CreateTaskResponse,
  })
  @Post('/create')
  public async createTask(@Body() createTaskDto: CreateTaskDto) {
    const result = await this.taskService.insertTask(createTaskDto);
    const response = this._utilService.successResponse<Task>(
      SuccessResponse.CREATED,
      'Task Created!',
      result,
    );
    return response;
  }

  @ApiOperation({ description: 'Get Task By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task Fetched!',
    type: FetchTaskResponse,
  })
  @Get('/:id')
  public async getTaskById(@Param('id') id: string) {
    const result = await this.taskService.getTaskById(id);
    const response = this._utilService.successResponse<Task>(
      SuccessResponse.OK,
      'Task Fetched!',
      result,
    );
    return response;
  }

  @ApiOperation({ description: 'Get Task By Duedate' })
  @ApiBody({ type: GetTaskByDuedate })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task Fetched!',
    type: GetTaskByDuedateResponse,
  })
  @Post('/duedate')
  public async getTaskByDueDate(@Body() { date }: GetTaskByDuedate) {
    const result = await this.taskService.getTaskByDuedate(date);
    const response = this._utilService.successResponse<Task[]>(
      SuccessResponse.OK,
      'Task Fetched!',
      result,
    );
    return response;
  }

  @ApiOperation({ description: 'Update Task' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task Updated!',
    type: FetchTaskResponse,
  })
  @Post('/:id/update')
  public async updateTask(
    @Param('id') id: string,
    @Body() update: UpdateTaskDto,
  ) {
    const result = await this.taskService.updateTask(id, update);
    const response = this._utilService.successResponse<Task>(
      SuccessResponse.OK,
      'Task Updated!',
      result,
    );
    return response;
  }

  @ApiOperation({ description: 'Delete Task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task Deleted!',
    type: FetchTaskResponse,
  })
  @Delete('/:id/delete')
  public async deleteTaks(@Param('id') id: string) {
    const result = await this.taskService.deleteTaskById(id);
    const message = 'Task Deleted';
    const response = this._utilService.successResponse<Partial<Task>>(
      SuccessResponse.OK,
      message,
      result,
    );
    return response;
  }

  @ApiOperation({ description: 'Get Summary' })
  @ApiBody({ type: SummaryDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Summary Fetched!',
    type: SummaryResponse,
  })
  @Post('/summary')
  public async getSummary(@Body() data: SummaryDto) {
    const result = await this.taskService.getSummary(data);
    const response = this._utilService.successResponse<Task[]>(
      SuccessResponse.OK,
      'Summary Fetched!',
      result,
    );
    return response;
  }
}
