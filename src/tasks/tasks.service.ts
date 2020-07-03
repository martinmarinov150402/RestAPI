import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './task.model';
import {TaskStatus} from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult, QueryBuilder } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository
        ){}
    async getTaskByID(id:number,user:User):Promise<Task>
    {
        const found = await this.taskRepository.findTaskById(id,user);
        
        if(!found)
        {
            throw new NotFoundException('Task not found');
        }
        return found;
    }
    async createTask(createTaskDto:CreateTaskDTO,user:User):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto,user);
    }
    deleteTaskByID(id:number,user:User):void
    {
        this.taskRepository.deleteTask(id,user);
    }
    async patchTask(id:number,user:User,item:string,val:string):Promise<Task>
    {
        const task = await this.getTaskByID(id,user);
        task[item]=val;
        await task.save();
        return task;
    }
    async getTasks(user:User):Promise<Task[]>
    {
        const res = await this.taskRepository.getTasks(user);
        return res;
    }
    /*private tasks: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    patchTask(id:string,item:string,val:string):Task
    {
        let taskid = this.tasks.findIndex(task => task.id===id);
        this.tasks[taskid][item]=val;
        return this.tasks[taskid];
    }*/
}
