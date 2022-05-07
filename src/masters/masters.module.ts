import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MastersService } from './masters.service';
import { MasterCreatedListener } from './listeners/master-created.listener';
import { MasterCreatedGateway } from './gateways/master-created.gateway';
import { MastersController } from './masters.controller';

import { Account } from '../accounts/entities/account.entity';
import { Master } from './entities/master.entity';

import { CaslAbilityFactory } from './abilities/master.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Master]),
  ],
  controllers: [MastersController],
  providers: [MastersService, MasterCreatedListener, MasterCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class MastersModule {}
