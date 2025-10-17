import { Module } from '@nestjs/common';
import { DbHelpersService } from './db-helpers.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [DbHelpersService],
  exports: [DbHelpersService],
})
export class DbHelpersModule {}
