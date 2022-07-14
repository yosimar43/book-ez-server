import { ClassroomsController } from './classrooms.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomsService } from './classrooms.service';
import { Classroom, ClassroomSchema } from './entities/classroom.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Classroom.name,
        schema: ClassroomSchema,
      },
    ]),
  ],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
})
export class ClassroomsModule {}
