import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTaskByID(id: number): Promise<Task>;
    crateNewTask(createtaskdto: CreateTaskDTO): Promise<Task>;
    deleteTask(id: number): void;
    getTasks(): Promise<Task[]>;
    patchTask(id: number, item: string, val: string): Promise<Task>;
}
