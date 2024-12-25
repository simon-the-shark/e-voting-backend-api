import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsString()
  message: string;
}
