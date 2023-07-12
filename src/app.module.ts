import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AccountModule } from './account/account.module';
import { BullBoardsModule } from './bull-board/bull-board.module';

@Module({
  imports: [AccountModule, BullBoardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
