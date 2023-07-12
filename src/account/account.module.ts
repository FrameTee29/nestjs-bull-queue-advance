import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AccountService } from './account.service';
import { AccountProcessor } from './account.processor';
import { AccountController } from './account.controller';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'account',
      useFactory: async () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountProcessor],
  exports: [AccountProcessor],
})
export class AccountModule {}
