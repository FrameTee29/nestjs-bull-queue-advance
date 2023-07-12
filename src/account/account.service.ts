import { JobOptions, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

const jobOptions: JobOptions = {
  repeat: {
    every: 60000, // Run every 1 minute
  },
};

@Injectable()
export class AccountService {
  constructor(@InjectQueue('account') private accountQueue: Queue) {}

  async syncBalance(accountNo: string) {
    try {
      const job = await this.accountQueue.add(
        'sync-balance',
        {
          accountNo,
        },
        { ...jobOptions, jobId: 'sync-balance-cron' },
      );
      // const result = await job.finished();

      return job;
    } catch (err) {
      throw err;
    }
  }

  async stopSyncBalance() {
    const jobs = await this.accountQueue.getRepeatableJobs();
    for (const job of jobs) {
      await this.accountQueue.removeRepeatableByKey(job.key);
    }
    return await this.accountQueue.getJobCounts();
  }
}
