import { Queue } from 'bull';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { createBullBoard } from '@bull-board/api';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter as BullBoardExpressAdapter } from '@bull-board/express';

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
})
export class BullBoardsModule {
  private bullBoardExpressAdapter: BullBoardExpressAdapter;
  constructor(
    @InjectQueue('account')
    private readonly accountQueue: Queue,
  ) {
    this.bullBoardExpressAdapter = new BullBoardExpressAdapter();
    createBullBoard({
      queues: [new BullAdapter(this.accountQueue, { readOnlyMode: true })],
      serverAdapter: this.bullBoardExpressAdapter,
    });
  }

  configure(consumer: MiddlewareConsumer): void {
    this.bullBoardExpressAdapter.setBasePath('/bull-boards');
    const router = this.bullBoardExpressAdapter.getRouter();
    consumer.apply(router).forRoutes('/bull-boards');
  }
}
