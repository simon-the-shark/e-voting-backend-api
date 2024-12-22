import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(pesel: string): Promise<User | null> {
    const user = await this.usersService.findOne(pesel);

    if (user) {
      return user;
    }
  }

  async login(user: User) {
    const roles = await this.usersService.getRoles(user.pesel);

    const payload = { pesel: user.pesel, sub: user.id, roles: roles };
    return {
      access_token: this.jwtService.sign(payload),
      roles: roles,
    };
  }
}
