import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';
import { MigrationService } from './migration.service';
import { UserFrom } from '../user/user.interface';

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
  async getMigrationDataByAddress(
    @Param('address') address: string,
    @Query('source') source: UserFrom,
  ) {
    if (source === 'web')
      return await this.migrationService.getMigrationDataByAddress(address);

    return await this.migrationService.getCrossMigrationDataByAddress(
      address,
      source,
    );
  }
}
