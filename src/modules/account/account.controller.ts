import { Body, Controller, Post } from '@nestjs/common';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('sync-balance')
  syncBalance(@Body('accountNo') accountNo: string) {
    return this.accountService.syncBalance(accountNo);
  }

  @Post('/stop/sync-balance')
  stopSyncBalance() {
    return this.accountService.stopSyncBalance();
  }
}
