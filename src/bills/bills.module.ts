import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillsService } from './bills.service';
import { BillCreatedListener } from './listeners/bill-created.listener';
import { BillCreatedGateway } from './gateways/bill-created.gateway';
import { BillsController } from './bills.controller';

import { Bill } from './entities/bill.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

import { CaslAbilityFactory } from './abilities/bill.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Bill]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [BillsController],
  providers: [BillsService, BillCreatedListener, BillCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class BillsModule {}
