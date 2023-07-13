import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';

type SyncBalanceMessage = {
  accountNo: string;
};

@Processor('account')
export class AccountProcessor {
  private readonly logger = new Logger(AccountProcessor.name);

  @Process('sync-balance')
  async handleSyncBalance(job: Job<SyncBalanceMessage>) {
    const data = job.data;

    this.logger.log(`(handleSyncBalance) - by jobId ${job.id}`);
    console.log(`(handleSyncBalance) - data => `, data);
    return { message: 'Successfully' };
  }
}
