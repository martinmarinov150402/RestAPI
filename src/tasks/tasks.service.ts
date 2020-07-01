import { Injectable, NotFoundException } from '@nestjs/common';
//import { Task, TaskStatus } from './task.model';
import {TaskStatus} from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository
        ){}
    async getTaskByID(id:number):Promise<Task>
    {
        const found = await this.taskRepository.findOne(id);
        if(!found)
        {
            throw new NotFoundException('Task not found');
        }
        return found;
    }
    async createTask(createTaskDto:CreateTaskDTO):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }
    deleteTaskByID(id:number):void
    {
        this.taskRepository.deleteTask(id);
    }
    async patchTask(id:number,item:string,val:string):Promise<Task>
    {
        const task = await this.getTaskByID(id);
        task[item]=val;
        await task.save();
        return task;
    }
    async getTasks():Promise<Task[]>
    {
        const res = await this.taskRepository.getTasks();
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
