import { Injectable } from '@nestjs/common';
import axios from 'axios';
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
