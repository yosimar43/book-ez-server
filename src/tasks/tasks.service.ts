import { Task, TaskDocument } from './entities/task.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll() {
    try {
      const tasks = await this.taskModel.find();
      return tasks;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const createNewTask: Task = {
      ...createTaskDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdTask = await this.taskModel.create(createNewTask);

    if (!createdTask) throw new InternalServerErrorException('Task no created');

    return createdTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findById(id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    const updatedTask = {
      ...updateTaskDto,
      updatedAt: new Date(),
    };

    const updatedTaskEntity = await this.taskModel.findByIdAndUpdate(
      id,
      { $set: updatedTask },
      { new: true },
    );

    return updatedTaskEntity;
  }

  async remove(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    const removedTask = await this.taskModel.findByIdAndRemove(id);

    return removedTask;
  }
}
