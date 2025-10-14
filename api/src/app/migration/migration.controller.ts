import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @UseGuards(SharedSecretGuard)
  @Get('')
  async getMigrationData() {
    return await this.migrationService.getMigrationData();
  }

  @UseGuards(SharedSecretGuard)
  @Get('/address/:address')
  async getMigrationDataByAddress(@Param('address') address: string) {
    return await this.migrationService.getMigrationDataByAddress(address);
  }
}
