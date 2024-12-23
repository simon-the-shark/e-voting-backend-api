import { Body, Controller, Post } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { AdministratorService } from './administrator.service';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) {}

  @Post()
  create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }
}
