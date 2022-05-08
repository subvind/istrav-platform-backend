import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersService } from './members.service';
import { MemberCreatedListener } from './listeners/member-created.listener';
import { MemberCreatedGateway } from './gateways/member-created.gateway';
import { MembersController } from './members.controller';

import { Member } from './entities/member.entity';
import { Website } from '../websites/entities/website.entity';
import { SocialGroup } from '../socialGroups/entities/socialGroup.entity';

import { CaslAbilityFactory } from './abilities/member.ability'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Website]),
    TypeOrmModule.forFeature([SocialGroup]),
  ],
  controllers: [MembersController],
  providers: [MembersService, MemberCreatedListener, MemberCreatedGateway, CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class MembersModule {}
