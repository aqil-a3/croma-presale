import { Module } from '@nestjs/common';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { DbHelpersModule } from 'src/service/db-helpers/db-helpers.module';

@Module({
  imports: [SupabaseModule, DbHelpersModule],
  controllers: [ReferralsController],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
