import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskByID(id: number, user: User): Promise<Task>;
    createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
    deleteTaskByID(id: number, user: User): void;
    patchTask(id: number, user: User, item: string, val: string): Promise<Task>;
    getTasks(user: User): Promise<Task[]>;
}
