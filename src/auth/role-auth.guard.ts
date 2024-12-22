import { Injectable } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user-role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Brak tokenu');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      const userRoles = payload.roles as UserRole[];

      if (roles.some((role) => userRoles.includes(role))) {
        return true;
      } else {
        throw new ForbiddenException('Brak odpowiednich uprawnień');
      }
    } catch {
      throw new ForbiddenException('Token jest nieprawidłowy lub wygasł');
    }
  }
}
