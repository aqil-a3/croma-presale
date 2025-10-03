import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { SupabaseModule } from 'src/service/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
