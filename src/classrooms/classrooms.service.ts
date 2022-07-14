import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassroomDocument } from './entities/classroom.entity';

import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel('Classroom')
    private readonly ClassroomModel: Model<ClassroomDocument>,
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {
    const newClassroom = {
      ...createClassroomDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createClassRoom = await this.ClassroomModel.create(newClassroom);

    if (!createClassRoom)
      throw new InternalServerErrorException('Classroom no created');

    return createClassRoom;
  }

  findAll() {
    return `This action returns all classrooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
