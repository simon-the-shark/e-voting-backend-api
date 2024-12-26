import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator';

export class MessageDto {
  @IsPositive()
  @IsInt()
  id: number;

  @IsString()
  message: string;

  @IsBoolean()
  isDangerous: boolean;
}
