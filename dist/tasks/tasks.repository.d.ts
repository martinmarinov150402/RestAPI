import { Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { User } from "src/auth/user.entity";
export declare class TaskRepository extends Repository<Task> {
    findTaskById(id: Number, user: User): Promise<Task>;
    getTasks(user: User): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
}
