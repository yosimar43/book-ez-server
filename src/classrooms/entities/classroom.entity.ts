import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from './task.entity';

export type ClassroomDocument = Classroom & Document;

@Schema({ versionKey: false, timestamps: true })
export class Classroom {
  @Prop({ required: true, unique: true })
  classroomId: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  tasks: Task[];
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
ClassroomSchema.set('toJSON', { virtuals: true });
