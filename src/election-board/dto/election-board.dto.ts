import { ConstituencyDto } from 'src/constituency/dto/constituency.dto';

export class ElectionBoardDto {
  id: number;
  address: string;
  number: number;
  constituencies: ConstituencyDto[];
}
