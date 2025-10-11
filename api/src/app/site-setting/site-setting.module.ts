import { Module } from '@nestjs/common';
import { SiteSettingController } from './site-setting.controller';
import { SiteSettingService } from './site-setting.service';
import { SupabaseModule } from 'src/service/supabase/supabase.module';

@Module({
  imports:[SupabaseModule],
  controllers: [SiteSettingController],
  providers: [SiteSettingService]
})
export class SiteSettingModule {}
