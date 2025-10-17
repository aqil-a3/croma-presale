import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { UserModule } from '../user/user.module';
import { DbHelpersModule } from '../../service/db-helpers/db-helpers.module';

@Module({
  imports: [SupabaseModule, UserModule, DbHelpersModule],
  providers: [InvestmentService],
  controllers: [InvestmentController],
  exports: [InvestmentService],
})
export class InvestmentModule {}
