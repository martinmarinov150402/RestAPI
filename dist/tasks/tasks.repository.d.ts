import { Repository, DeleteResult } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
export declare class TaskRepository extends Repository<Task> {
    getTasks(): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDTO): Promise<Task>;
    deleteTask(id: number): Promise<DeleteResult>;
}
