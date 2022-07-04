import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    if (await this.userModel.findOne({ email }))
      throw new BadRequestException(`User with email ${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdUser = await this.userModel.create(newUser);

    if (!createdUser) throw new InternalServerErrorException('User no created');

    return createdUser;
  }

  async getAll() {
    const users: User[] = await this.userModel.find().exec();

    return users;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const { email, password } = updateUserDto;

    if (email && email !== user.email) {
      if (await this.userModel.findOne({ email }))
        throw new BadRequestException(
          `User with email ${email} already exists`,
        );
    }

    const hashedPassword = await bcrypt.hash(password ?? user.password, 10);

    const updatedUser = {
      ...updateUserDto,
      password: hashedPassword,
      updatedAt: new Date(),
    };

    const updatedUserDocument = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updatedUser },
      { new: true },
    );

    return updatedUserDocument;
  }

  async remove(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.userModel.findByIdAndRemove(id);

    return user;
  }
}
