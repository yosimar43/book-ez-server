import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  classroomId: number;
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  status: 'open' | 'in-progress' | 'done';

  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;
  @Prop({ required: true })
  expirationDate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', { virtuals: true });
