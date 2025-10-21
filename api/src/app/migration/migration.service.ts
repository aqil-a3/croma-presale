import { Injectable, NotFoundException } from '@nestjs/common';
import axios, { isAxiosError } from 'axios';
import {
  FullMigrationData,
  MigrationDb,
  MigrationDbInsert,
} from './migration.interface';
import { SupabaseService } from '../../service/supabase/supabase.service';

@Injectable()
export class MigrationService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private readonly supabaseAdmin = this.supabaseService.getAdmin();
  private readonly tableName = 'migration_data';
  private readonly airdropApiKey = process.env.AIRDROP_SHARED_SECRET_KEY;
  // private readonly airdropBaseUrl = 'http://localhost:3000';
  private readonly airdropBaseUrl = 'https://airdrop.cromachain.com';

  async createNewMigrationData(
    payload: MigrationDbInsert | MigrationDbInsert[],
  ) {
    const { error } = await this.supabaseAdmin
      .from(this.tableName)
      .insert(payload);

    if (error) {
      console.error(error);
      throw error;
    }
  }

  async createNewMigrationDataIfNotExist(
    payload: MigrationDbInsert | MigrationDbInsert[],
  ) {
    const items = Array.isArray(payload) ? payload : [payload];

    for (const item of items) {
      const existing = await this.getCrossMigrationDataByAddress(
        item.wallet_address,
        item.source,
      );

      if (!existing) {
        const { error } = await this.supabaseAdmin
          .from(this.tableName)
          .insert(item);

        if (error) {
          console.error('Failed to insert migration data:', error);
          throw error;
        }

        console.log(
          `[Migration] ✅ New migration data inserted for ${item.wallet_address} (${item.source})`,
        );
      } else {
        console.log(
          `[Migration] ⚠️ Migration data already exists for ${item.wallet_address} (${item.source}), skipped.`,
        );
      }
    }
  }

  async getAllSourceMigrationDataByAddress(
    wallet_address: string,
  ): Promise<MigrationDb[]> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('wallet_address', wallet_address);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

  async getAirdropDataByAddress(wallet_address: string) {
    try {
      const { data } = await axios.get(
        `${this.airdropBaseUrl}/api/migration/presale?wallet_address=${wallet_address}`,
        {
          headers: {
            'x-api-key': this.airdropApiKey,
          },
        },
      );

      return data.finalData;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 404)
          return new NotFoundException('User Not Found');
      }
      throw error;
    }
  }

  async getCrossMigrationDataByAddress(
    wallet_address: string,
    source: string,
  ): Promise<MigrationDb | null> {
    const { data, error } = await this.supabaseAdmin
      .from(this.tableName)
      .select('*')
      .eq('wallet_address', wallet_address)
      .eq('source', source)
      .maybeSingle();

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  }

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
