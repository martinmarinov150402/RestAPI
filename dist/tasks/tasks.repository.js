"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const task_status_enum_1 = require("./task-status.enum");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../auth/user.entity");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    async findTaskById(id, user) {
        const query = this.createQueryBuilder('task');
        query.andWhere("task.userId = :userId", { userId: user.id });
        query.andWhere("task.id = :taskId", { taskId: id });
        return await query.getOne();
    }
    async getTasks(user) {
        const query = this.createQueryBuilder('task');
        query.andWhere('task.userId = :userId', { userId: user.id });
        const tasks = await query.getMany();
        return tasks;
    }
    async createTask(createTaskDto, user) {
        const task = new task_entity_1.Task();
        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
    async deleteTask(id, user) {
        const task = await this.delete({ id, userId: user.id });
        if (task.affected === 0) {
            throw new common_1.NotFoundException('Task not found');
        }
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=tasks.repository.js.map