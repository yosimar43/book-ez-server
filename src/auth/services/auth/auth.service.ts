import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  register(user: CreateUserDto) {
    return this.userService.create(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  generateJWT(user: any) {
    const payload = {
      role: user.role,
      sub: user.id,
    };

    return {
      acces_token: this.jwtService.sign(payload),
      user,
    };
  }
}
