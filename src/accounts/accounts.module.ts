import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountCreatedListener } from './listeners/account-created.listener';
import { AccountCreatedGateway } from './gateways/account-created.gateway';
import { AccountsController } from './accounts.controller';

import { CaslAbilityFactory } from './abilities/account.ability'

@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountCreatedListener, AccountCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class AccountsModule {}
