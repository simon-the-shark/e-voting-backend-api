import { IsBoolean, IsString } from 'class-validator';

export class CreateVoterDto {
  @IsString()
  readonly pesel: string;

  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly address: string;

  @IsBoolean()
  readonly ifVerified: boolean;
}
