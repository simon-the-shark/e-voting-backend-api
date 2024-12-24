import { UserRole } from '../../users/entities/user-role.entity';

export class AuthDto {
  readonly access_token: string;
  readonly roles: UserRole[];
}
