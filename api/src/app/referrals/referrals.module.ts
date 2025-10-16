import { forwardRef, Module } from '@nestjs/common';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { InvestmentModule } from '../investment/investment.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SupabaseModule],
  controllers: [ReferralsController],
  providers: [ReferralsService],
  exports: [ReferralsService],
})
export class ReferralsModule {}
