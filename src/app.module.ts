import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { DepositModule } from './deposit/deposit.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [DepositModule, WithdrawModule, AccountModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
