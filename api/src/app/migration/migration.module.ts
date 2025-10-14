import { Module } from '@nestjs/common';
import { MigrationController } from './migration.controller';
import { MigrationService } from './migration.service';
import { SupabaseModule } from '../../service/supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [MigrationController],
  providers: [MigrationService]
})
export class MigrationModule {}
