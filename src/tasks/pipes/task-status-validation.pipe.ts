import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly ValidStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];
    transform(value:any)
    {
        value=value.toUpperCase();
        if(!this.isStatusValid(value))
        {
            throw new BadRequestException(`Invalid status`);
        }
        return value;
    }
    private isStatusValid(status)
    {
        const idx = this.ValidStatuses.indexOf(status);
        return idx !== -1;
    }
}