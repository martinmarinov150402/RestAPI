import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getTaskByID(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDTO): Promise<Task>;
    deleteTaskByID(id: number): void;
    patchTask(id: number, item: string, val: string): Promise<Task>;
    getTasks(): Promise<Task[]>;
}
