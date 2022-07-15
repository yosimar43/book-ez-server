import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Classroom, ClassroomDocument } from './entities/classroom.entity';

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

    const createClassRoom: Classroom = await this.ClassroomModel.create(
      newClassroom,
    );

    if (!createClassRoom)
      throw new InternalServerErrorException('Classroom no created');

    return createClassRoom;
  }

  async findAll() {
    const classrooms = await this.ClassroomModel.find();

    return classrooms;
  }

  async findOne(id: string) {
    const classroom = await this.ClassroomModel.findById(id);

    if (!classroom) throw new NotFoundException('Classroom no found');

    return classroom;
  }

  async update(id: string, updateClassroomDto: UpdateClassroomDto) {
    const classroom = await this.ClassroomModel.findByIdAndUpdate(
      id,
      {
        $set: updateClassroomDto,
      },
      {
        new: true,
      },
    );

    if (!classroom) throw new NotFoundException('Classroom no found');

    return classroom;
  }

  async remove(id: string) {
    const classroom = await this.ClassroomModel.findByIdAndRemove(id);

    if (!classroom) throw new NotFoundException('Classroom no found');

    return classroom;
  }
}
