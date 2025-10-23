import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SharedSecretGuard } from '../../guards/shared-secret.guard';
import { MigrationService } from './migration.service';
import { UserFrom } from '../user/user.interface';
import { MigrationDb, MigrationDbInsert } from './migration.interface';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  // HELPERS START
  private async getAllSourceMigrationDataByAddress(address: string) {
    const raw =
      await this.migrationService.getAllSourceMigrationDataByAddress(address);

    const points = raw.reduce((acc, curr) => acc + curr.points, 0);
    const result: MigrationDb = {
      created_at: raw[0].created_at,
      id: raw[0].id,
      points,
      source: 'all',
      wallet_address: address,
      airdrop_nft_amounts: [],
    };

    return result;
  }
  // HELPERS END

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
    if (source === 'all')
      return await this.getAllSourceMigrationDataByAddress(address);
    if (source === 'airdrop') {
      const existData =
        await this.migrationService.getCrossMigrationDataByAddress(
          address,
          source,
        );

        if (existData) return existData;
        
      const data = await this.migrationService.getAirdropDataByAddress(address);
      await this.migrationService.createNewMigrationDataIfNotExist(data);

      return data;
    }

    return await this.migrationService.getCrossMigrationDataByAddress(
      address,
      source,
    );
  }

  @UseGuards(SharedSecretGuard)
  @Patch('airdrop/:address')
  async patchMigrationDataByAddress(@Param('address') address: string) {
    const data = await this.migrationService.getAirdropDataByAddress(address);
    await this.migrationService.updateMigrationDataByAddress(data, address);
    return data;
  }

  @UseGuards(SharedSecretGuard)
  @Post('/airdrop')
  async createNewMigrationData(@Body() data: MigrationDb) {
    return await this.migrationService.createNewMigrationDataIfNotExist(data);
  }

  // NOTE : INI JAGA JAGA KALO SEWAKTU-WAKTU PERLU MIGRASI LAGI
  // @Get('/airdrop')
  // async migrationAirdrop() {
  //   const fullData = await this.migrationService.getMigrationData();

  //   const payload: MigrationDbInsert[] = fullData.map((data) => ({
  //     points: data.points,
  //     source: 'web',
  //     wallet_address: data.wallet_address,
  //   }));

  //   // await this.migrationService.createNewMigrationData(payload)

  //   return {fullData};
  // }
}
