import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserCreatedListener } from './listeners/user-created.listener';
import { UserCreatedGateway } from './gateways/user-created.gateway';
import { UsersController } from './users.controller';

import { Account } from '../accounts/entities/account.entity';
import { User } from './entities/user.entity';

import { CaslAbilityFactory } from './abilities/user.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserCreatedListener, UserCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class UsersModule {}
