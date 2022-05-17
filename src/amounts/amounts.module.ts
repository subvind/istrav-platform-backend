import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmountsService } from './amounts.service';
import { AmountCreatedListener } from './listeners/amount-created.listener';
import { AmountCreatedGateway } from './gateways/amount-created.gateway';
import { AmountsController } from './amounts.controller';

import { Amount } from './entities/amount.entity';
import { Tenant } from '../tenants/entities/tenant.entity';

import { CaslAbilityFactory } from './abilities/amount.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Amount]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [AmountsController],
  providers: [AmountsService, AmountCreatedListener, AmountCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class AmountsModule {}
