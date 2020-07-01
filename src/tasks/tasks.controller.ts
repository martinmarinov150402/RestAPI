import { Controller, Get, Post, Body ,Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get("/:id")
    getTaskByID(@Param("id",ParseIntPipe) id:number):Promise<Task>
    {
        return this.tasksService.getTaskByID(id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    crateNewTask(
        @Body() createtaskdto:CreateTaskDTO
    ):Promise<Task> {
        return this.tasksService.createTask(createtaskdto);
    }

    @Delete("/:id")
    deleteTask(@Param("id", ParseIntPipe) id:number):void
    {
        this.tasksService.deleteTaskByID(id);
    }
    @Get()
    getTasks(): Promise<Task[]> {
        return this.tasksService.getTasks();
    }
    @Patch("/:id/:item")
    patchTask(@Param("id",ParseIntPipe) id:number,@Param("item") item:string,@Body("val",TaskStatusValidationPipe) val:string):Promise<Task>
    {
        return this.tasksService.patchTask(id,item,val);
    }
}
