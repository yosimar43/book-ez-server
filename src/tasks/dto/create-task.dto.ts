import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['active', 'completed'])
  readonly status: 'active' | 'completed';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsIn(['low', 'medium', 'high'])
  readonly priority: 'low' | 'medium' | 'high';

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;
}
