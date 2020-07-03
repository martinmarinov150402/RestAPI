"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const task_status_validation_pipe_1 = require("./pipes/task-status-validation.pipe");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getTaskByID(id, user) {
        return this.tasksService.getTaskByID(id, user);
    }
    crateNewTask(createtaskdto, user) {
        return this.tasksService.createTask(createtaskdto, user);
    }
    deleteTask(id, user) {
        this.tasksService.deleteTaskByID(id, user);
    }
    getTasks(user) {
        return this.tasksService.getTasks(user);
    }
    patchTask(id, user, item, val) {
        return this.tasksService.patchTask(id, user, item, val);
    }
};
__decorate([
    common_1.Get("/:id"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskByID", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDTO, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "crateNewTask", null);
__decorate([
    common_1.Delete("/:id"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)), __param(1, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteTask", null);
__decorate([
    common_1.Get(),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Patch("/:id/:item"),
    __param(0, common_1.Param("id", common_1.ParseIntPipe)), __param(1, get_user_decorator_1.GetUser()), __param(2, common_1.Param("item")), __param(3, common_1.Body("val", task_status_validation_pipe_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "patchTask", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map