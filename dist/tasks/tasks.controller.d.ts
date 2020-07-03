import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskByID(id: number, user: User): Promise<Task>;
    crateNewTask(createtaskdto: CreateTaskDTO, user: User): Promise<Task>;
    deleteTask(id: number, user: User): void;
    getTasks(user: User): Promise<Task[]>;
    patchTask(id: number, user: User, item: string, val: string): Promise<Task>;
}
