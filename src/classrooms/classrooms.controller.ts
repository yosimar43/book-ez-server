import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsMongoIdPipe } from 'src/common/pipes/is-mongo-id.pipe';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@UseGuards(AuthGuard('jwt'))
@Controller(':userId/classrooms')
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.classroomsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.classroomsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomsService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.classroomsService.remove(id);
  }
}
