import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import configuration from './constant/environment/config';
import { AccountModule } from './modules/account/account.module';
import { BullBoardsModule } from './bull-board/bull-board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    AccountModule,
    BullBoardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
