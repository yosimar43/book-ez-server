import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Task } from './../entities/task.entity';
import { Type } from 'class-transformer';

export class CreateClassroomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsArray({ message: 'Task must be an array' })
  @ValidateNested({ each: true, message: 'Task not contain correct property' })
  @Type(() => CreateTaskDto)
  tasks: Task[];
}
