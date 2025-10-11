import { Module } from '@nestjs/common';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import { SupabaseModule } from '../../service/supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [ReferralsController],
  providers: [ReferralsService]
})
export class ReferralsModule {}
