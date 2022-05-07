import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsService } from './admins.service';
import { AdminCreatedListener } from './listeners/admin-created.listener';
import { AdminCreatedGateway } from './gateways/admin-created.gateway';
import { AdminsController } from './admins.controller';

import { Account } from '../accounts/entities/account.entity';
import { Admin } from './entities/admin.entity';

import { CaslAbilityFactory } from './abilities/admin.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Admin])
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminCreatedListener, AdminCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class AdminsModule {}
