import { Module } from '@nestjs/common';
import { PresaleService } from './presale.service';
import { PresaleController } from './presale.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [PresaleService],
  controllers: [PresaleController],
})
export class PresaleModule {}
