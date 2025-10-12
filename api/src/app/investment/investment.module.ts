import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[SupabaseModule, UserModule],
  providers: [InvestmentService],
  controllers: [InvestmentController],
})
export class InvestmentModule {}
