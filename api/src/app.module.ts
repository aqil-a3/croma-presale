import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './service/supabase/supabase.module';
import { PresaleModule } from './app/presale/presale.module';
import { FaqModule } from './app/faq/faq.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, SupabaseModule, PresaleModule, FaqModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
