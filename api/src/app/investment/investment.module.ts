import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { UserModule } from '../user/user.module';
import { DbHelpersModule } from '../../service/db-helpers/db-helpers.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SupabaseModule, UserModule, DbHelpersModule, JwtModule],
  providers: [InvestmentService],
  controllers: [InvestmentController],
  exports: [InvestmentService],
})
export class InvestmentModule {}
