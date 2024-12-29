import { IsBoolean, IsString } from 'class-validator';

export class CreateAdminMessageDto {
  @IsString()
  message: string;

  @IsBoolean()
  isDangerous: boolean;
}
