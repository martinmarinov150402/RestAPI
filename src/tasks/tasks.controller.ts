import { Controller, Get, Post, Body ,Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as uuid from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService:TasksService){}
    @Get("/:id")
    getTaskByID(@Param("id",ParseIntPipe) id:number, @GetUser() user:User):Promise<Task>
    {
        return this.tasksService.getTaskByID(id,user);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    crateNewTask(
        @Body() createtaskdto:CreateTaskDTO, @GetUser() user:User
    ):Promise<Task> {
        return this.tasksService.createTask(createtaskdto,user);
    }

    @Delete("/:id")
    deleteTask(@Param("id", ParseIntPipe) id:number,@GetUser() user:User):void
    {
        this.tasksService.deleteTaskByID(id,user);
    }
    @Get()
    getTasks(@GetUser() user:User): Promise<Task[]> {
        return this.tasksService.getTasks(user);
    }
    @Patch("/:id/:item")
    patchTask(@Param("id",ParseIntPipe) id:number,@GetUser() user:User,@Param("item") item:string,@Body("val",TaskStatusValidationPipe) val:string):Promise<Task>
    {
        return this.tasksService.patchTask(id,user,item,val);
    }
}
