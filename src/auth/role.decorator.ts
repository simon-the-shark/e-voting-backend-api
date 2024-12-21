import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user-role.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
