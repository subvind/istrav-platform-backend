import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from './entities/member.entity';
import { MembersService } from './members.service';
import { MemberCreatedListener } from './listeners/member-created.listener';
import { MemberCreatedGateway } from './gateways/member-created.gateway';
import { MembersController } from './members.controller';

@Module({
  imports: [EventEmitterModule.forRoot(), TypeOrmModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [MembersService, MemberCreatedListener, MemberCreatedGateway]
})
export class MembersModule {}
