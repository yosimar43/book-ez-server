import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { IsMongoIdPipe } from 'src/common/pipes/is-mongo-id.pipe';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: true,
    excludeMongooseV: true,
  }),
)
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', IsMongoIdPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', IsMongoIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', IsMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }
}
