import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './service/supabase/supabase.module';
import { PresaleModule } from './app/presale/presale.module';
import { FaqModule } from './app/faq/faq.module';
import { UserModule } from './app/user/user.module';
import { InvestmentModule } from './app/investment/investment.module';
import { SiteSettingModule } from './app/site-setting/site-setting.module';
import { ReferralsModule } from './app/referrals/referrals.module';
import { MigrationModule } from './app/migration/migration.module';
import { DbHelpersModule } from './service/db-helpers/db-helpers.module';
import { RawBodyMiddleware } from './middleware/raw-body.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SupabaseModule,
    PresaleModule,
    FaqModule,
    UserModule,
    InvestmentModule,
    SiteSettingModule,
    ReferralsModule,
    MigrationModule,
    DbHelpersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('*');
  }
}
