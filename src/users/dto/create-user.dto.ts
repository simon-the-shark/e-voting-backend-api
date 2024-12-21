import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../entities/user-role.entity';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly pesel: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @Transform(({ value }) => value.map((role: string) => role.toLowerCase()))
  @IsEnum(UserRole, { each: true })
  readonly roles: UserRole[];
}
