import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { UserService } from '../user/user.service';

@Module({
  imports:[SupabaseModule],
  providers: [InvestmentService, UserService],
  controllers: [InvestmentController]
})
export class InvestmentModule {}
