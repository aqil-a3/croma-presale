import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { UserModule } from '../user/user.module';
import { ReferralsModule } from '../referrals/referrals.module';

@Module({
  imports: [SupabaseModule, UserModule, ReferralsModule],
  providers: [InvestmentService],
  controllers: [InvestmentController],
  exports: [InvestmentService],
})
export class InvestmentModule {}
