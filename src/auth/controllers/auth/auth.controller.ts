import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { AuthService } from 'src/auth/services/auth/auth.service';

@UseGuards(AuthGuard('local'))
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: true,
    excludeMongooseV: true,
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }
}
