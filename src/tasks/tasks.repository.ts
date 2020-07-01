import { Repository, EntityRepository, DeleteResult } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(): Promise<Task[]>
    {
        const query=this.createQueryBuilder('task');
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto:CreateTaskDTO){
        const task=new Task();
        const {title,description} = createTaskDto;
        task.title=title;
        task.description=description;
        task.status=TaskStatus.OPEN;
        await task.save();
        return task;
    }
    async deleteTask(id:number):Promise<DeleteResult>
    {
        const task=this.findOne(id);
        if(!task)
        {
            throw new NotFoundException('Task not found');
        }
        else
        {
            const res = await this.delete(id);
            return res;
        }
        
    }
}