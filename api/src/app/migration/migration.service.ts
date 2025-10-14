import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FullMigrationData } from './migration.interface';

@Injectable()
export class MigrationService {
  private readonly airdropApiKey = process.env.AIRDROP_SHARED_SECRET_KEY;
  private readonly airdropBaseUrl = 'https://airdrop.cromachain.com';

  async getMigrationData(): Promise<FullMigrationData[]> {
    try {
      const { data } = await axios.get(`${this.airdropBaseUrl}/api/migration`, {
        headers: {
          'x-api-key': this.airdropApiKey,
        },
      });

      return data.fullMigrationData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMigrationDataByAddress(
    address: string,
  ): Promise<FullMigrationData | null> {
    const migrationData = await this.getMigrationData();
    const selected = migrationData.find(
      (mig) => mig.wallet_address === address,
    );

    return selected;
  }
}
