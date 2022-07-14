import { IsDate, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

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
  @IsEnum(['open', 'in-progress', 'done'])
  status: 'open' | 'in-progress' | 'done';

  @IsDate()
  @IsNotEmpty()
  expirationDate: Date;
}
