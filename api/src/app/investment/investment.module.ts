import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  providers: [InvestmentService],
  controllers: [InvestmentController]
})
export class InvestmentModule {}
