import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseModule } from '../../service/supabase/supabase.module';
import { ReferralsModule } from '../referrals/referrals.module';

@Module({
  imports:[SupabaseModule, forwardRef(() => ReferralsModule) ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
