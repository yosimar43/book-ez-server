import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  classroomId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['open', 'in-progress', 'done'])
  status: 'open' | 'in-progress' | 'done';

  @IsDate()
  @IsNotEmpty()
  expirationDate: Date;
}
